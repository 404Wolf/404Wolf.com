# Goal

Recently I've been coding a tool to automatically generate `SVG` files. `SVG`s are a great type of image file to generate, since they follow a strict XML format, and thus can have text or base64 images injected into them with ease. However, in my case I have external imports and HTML elements that I'm loading into my SVGs, which prevents most libraries that already exist from importing them. Something I noticed, however, is that Chrome has no issue with loading complex SVGs with imports, and that I could print out my SVGs with ease, letting me easily take screenshots of the exports. This wouldn't be an ideal solution, but it was the first step to the solution.

## Printing to PDFs

![Chrome Devtools PDF Printing](renderPDF.png|width=36|float=right)

As it turns out, Chrome lets you print not just to printers, but also to PDF files directly. The settings are highly customizable, and let me export my `SVG` super easily to a `PDF`. 

It provides options for setting the page layout, along with adding margins (which, since I'm not actually planning to print my `SVG`s, could be set to 0), and setting a page range, amongst others. Importantly, it also allows for the file to be exported as a stream or base64 data string, which would allow me to not have to do additional file handling.

In addition to printing to the same size as my file itself with 0 margin, I also set the page size with the `Emulation.setVisibleSize` command, since for some reason Chrome seemed to also add additional padding to the page anyways. In reality, this step could have been skipped by setting the `scale` to something slightly above 1, but I decided that it'd be easier to just resize the page itself.

# Loading up a chrome driver

The first step of the process is to load up a chrome driver. I decided to externalize this step, loading up a chrome driver in a separate "engine" module, so that I wouldn't need to load in a new chrome driver for each PDF conversion. In the past I've used [Pyppeteer](https://github.com/pyppeteer/pyppeteer), a fork of [Puppeteer](https://pptr.dev/) to automate Chrome, for various unrelated projects. However, since Pyppeteer is now no longer maintained, I decided to explore [Selenium](https://www.selenium.dev/), a different popular browser automation library, instead. After some research, I came across many StackOverflow articles like [this one](https://stackoverflow.com/a/68353518/14266969), explaining how I could take advantage of the Chrome DevTools Protocol command [Page.printToPDF](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) to run the print command. 


```py
import atexit
import base64
import os
from time import sleep

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--kiosk-printing")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-extensions")

webdriver_chrome = webdriver.Chrome(service=service, options=chrome_options)
atexit.register(webdriver_chrome.close)
```

# The conversion

Now comes the most important step: actually printing to a PDF. This is a that, as I saw it, could be broken up into a few distinct parts: somehow loading the to-be-converted file into Chrome, resizing the page and printing the file to a base64 PDF, and then dumping the PDF to a file. For my purpose, I already had the SVG file as a string of text in memory, and didn't want to write it to my drive only to delete it after the conversion. To avoid the extra file handling, then, I came up with the idea of injecting the `SVG` into an `about:blank` Chrome page (a blank page with an empty document body), as a \<img\> with `height: 100%; width: 100%`. This let me print directly from memory to memory, which was a huge step forward.

Below is the actual code for this process, with comments that should help clearly show the various steps... 


```py
from src.converter.engine import webdriver_chrome


def render(data: str, mimetype: str, width: int, height: int) -> str:
    """
    Convert a chrome preview-able file to a base-64 encoded pdf using Selenium.

    Args:
        data (str): Base64 encoded preview-able file.
        mimetype (str): The mimetype of the base64 data.
        width (float): The width of the preview-able file.
        height (float): The height of the preview-able file.
    Returns:
        str: The base64 encoded pdf.
    """
    assert isinstance(width, (float, int)), f"Width must be num, not {type(width)}."
    assert isinstance(height, (float, int)), f"Height must be num, not {type(height)}."

    # Load in a blank HTML page
    webdriver_chrome.get(f"about:blank")

    # Execute a chrome-devtools-protocol command to change the window size
    webdriver_chrome.execute_cdp_cmd(
        "Emulation.setVisibleSize",
        {
            "width": width,
            "height": height,
        },
    )

    # Ship js to the console in our browser
    webdriver_chrome.execute_script(
        "document.body.style.margin = '0';"
        "const content = document.createElement('img');"
        f"content.src = 'data:{mimetype};base64,{data}';"
        "content.style.width = '100%';"
        "content.style.height = '100%';"
        "document.body.appendChild(content);"
    )

    # Print to PDF with output as base64
    pdf = webdriver_chrome.execute_cdp_cmd(
        "Page.printToPDF",
        {
            "printBackground": False,
            "landscape": False,
            "displayHeaderFooter": False,
            "scale": 1.5,
            "paperWidth": 1.75,
            "paperHeight": 2.5,
            "marginTop": 0,
            "marginBottom": 0,
            "marginLeft": 0,
            "marginRight": 0,
        },
    
    return pdf["data"]  # The base64 encoded PDF
```
