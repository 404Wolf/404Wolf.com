# The Task

I've recently been working on a project to automatically generate English flashcards with a blend of AI and APIs to fetch data, and a template of some sort to slot it into. For the latter part, I've spent significant time researching. I've come across different Js frameworks like [Paper.js](http://paperjs.org/), but eventually settled on utilizing raw, generated `SVG` files. `SVG`s are a great type of image file to generate, since they follow a strict XML format, and thus can have text or base64 images injected into them with ease.

## SVGs are Awesome

`SVG`s really are great. They're a undervalued file format that can be used for so, so much more than just icons and simple graphics. They allow you to easily integrate countless different elements in `xml` form, like `<animate>` and `<path>`. You can slot in `<foreignObject>`s to add external elements like such...

```xml
<!-- Inspirational quote -->
<foreignObject x="0" y="41" width="126" height="24">
    <xhtml xmlns="http://www.w3.org/1999/xhtml">
        <p class="inspirational-quote">
            "{{ INSPIRATIONAL_QUOTES_1 }}"
        </p>
    </xhtml>
</foreignObject>
```

`<iFrame>`s, and all other `HTML` and even some `js` goodies become real possibilities. `css` styles can be added natively, including classes and all. However, when you begin to slot in external sources like this, problems arise when it comes to rendering the `svg`s to self-contained `PDF`s or rasterized `JPG`/`PNG` images.

The external imports and HTML elements that I'm loading into my SVGs prevents most libraries that already exist from importing them, likely as either a security precaution, or perhaps because externally defined data is hard to render. Something I noticed, however, is that Chrome has no issue with loading complex SVGs with imports. Chrome is a full fledged browser, so it makes sense that it has baked-in support for all the external elements I may include.

But how does this help me render `SVG`s? Well, as it turns out, Chrome provides a great renderer too. It's a bit clunky, and maybe not an ideal solution, but it works well and consistently.

## Printing to PDFs

![Chrome Devtools PDF Printing](renderPDF.png|width=36|float=right)

To render `SVG`s with chrome, I first turned to its printing functionality. Importantly, Chrome lets you print not just to printers, but also to PDF files directly. The settings are highly customizable, and let you export `SVG` super easily to a `PDF`.

Just like with regular printing, Chrome provides options for setting the page layout, along with adding margins (which, since I'm not actually planning to print my `SVG`s, could be set to 0), setting a page range, and more. With the devtools protocol, which is essentially a way to computationally interact with the printing API, even more options become possible. With the API, Chrome allows for the file to be exported as a data stream or base64 data string, which would allow me to not have to do additional file handling.

# Loading up a chrome driver

The first step of the process is to load up a chrome driver. I decided to externalize this step, loading up a chrome driver in a separate "engine" module, so that I wouldn't need to load in a new chrome driver for each PDF conversion. In the past I've used [Pyppeteer](https://github.com/pyppeteer/pyppeteer), a fork of [Puppeteer](https://pptr.dev/) to automate Chrome, for various unrelated projects. However, since Pyppeteer is now no longer maintained, I decided to explore [Selenium](https://www.selenium.dev/), a different popular browser automation library, instead. After some research, I came across many StackOverflow articles like [this one](https://stackoverflow.com/a/68353518/14266969), explaining how I could take advantage of the Chrome DevTools Protocol command [Page.printToPDF](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) to run the print command. Since my goal was to avoid needless file handling, I didn't plan on using the exact code from StackOverflow, but it would be a good starting point, and showed that my planned procedure was indeed a possibility.


```py
import atexit
import os

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Install chromium if it isn't already installed
service = Service(ChromeDriverManager().install())

chrome_options = webdriver.ChromeOptions()
# Kiosk printing makes it so that the print dialog GUI is hidden. Since I'm using headless
# chrome, I believe this just reduces the compute to interact with the print-to-pdf API, since
# it wouldn't be shown anyway, but may still be rendered. This seems like a common flag for
# printing to PDF, so I included it since it didn't hurt.
chrome_options.add_argument("--kiosk-printing")
# Disable's the UI. Not needed, but makes things faster and things work on CLI only computers.
chrome_options.add_argument("--headless")
# Printing to PDF shouldn't require a GPU.
chrome_options.add_argument("--disable-gpu")
# The sandbox seems to prevent tabs from messing with each other, as a security feature. Since
# we're 'hacking' Chrome to render PDFs, making Chrome lighter any way we can is ideal.
# https://www.google.com/googlebooks/chrome/med_26.html (comic I found that helps explain it)
chrome_options.add_argument("--no-sandbox")

# Create the webdriver, and make sure that it closes properly when Python exits
webdriver_chrome = webdriver.Chrome(service=service, options=chrome_options)
atexit.register(webdriver_chrome.close)
```

# Webpage Injection 'Hack'

As aforementioned, something important for the rendering process is for it to be able to be done purely in memory. My project utilized templated `SVG`s, so writing rendered templates in their `SVG` form to disc for the sole purpose of loading them into Chrome only to dump them back to dic would be extremely redundant. So, I devised a solution.

The thing with `SVG`s is that they are, when it comes down to it, a special type of image file. You can put them into html with the special `<svg>` tag, or, just like any other image, with `<img src="data:image/xml+svg;base64{base64-encoded-svg}>`. Then, you can set properties just like any other old `<img>` element: `{width: 100%; height: 100%; ...}`. Super simple! So, instead of dumping the `SVG` to disc and using Chrome's file preview ability (in Chrome you can visit `file:///<path>` to preview a file), I decided to inject the `SVG` I wanted to render.

![Chrome's about:blank](aboutBlank.png) 
![Injected image](injectedImage.png)

To do this, first I opened an `about:blank` page. I knew I'd want to resize the image to fill the entire viewport, but I'd also want to resize the viewport to be the exact size that I wished for my final export to be. For this, I used Chrome devtools' `Emulation.setVisibleSize` command. Then, I sent the following javascript to the browser to inject the image.


```js
document.body.style.margin = '0';  // remove the default document margin
const content = document.createElement('img');  // create the <img> element
content.src = 'data:{mimetype};base64,{data}'; // inject the svg as a b64 image
content.style.width = '100%';  // maximize the image
content.style.height = '100%';
document.body.appendChild(content); // inject the image
```

# 'Printing' the PDF

Now comes the most important step: actually printing to a PDF. This step was super simple: just a Chrome devtools command. Check it out...

```py
webdriver_chrome.execute_cdp_cmd(
"Page.printToPDF",
    {
        "printBackground": False,
        "landscape": False,
        "displayHeaderFooter": False,
        "scale": 1.5, # chrome seems to add some extra margin when printing, even
        # when the margins are set to 0. I just scaled up a bit to account for this.
        "paperWidth": 1.75, # the width of the document I'm dealing with, in inches
        "paperHeight": 2.5, # the height in inches
        "marginTop": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "marginRight": 0,
    }
)["data"]  # grab the b64 encoded PDF
```

# Potential
The cool thing with SVGs is that not only can you write them out in a text editor easily, but you can also template them. I'm not going to go too far into that procedure here, but [here's a simple example](https://github.com/404Wolf/SvgTemplating) of utilizing `SVG`s as a document template for an English vocab flashcard. The idea is that you can slot in `{{ FIELD_NAME }}` `jijna2` (templating engine) fields, slot in your own data (whether fetched from an API, user entered, AI generated, or what not), and then render it to a PDF. 

This is just the start, and feel free to reach out if any other `SVG`-related ideas come to mind!