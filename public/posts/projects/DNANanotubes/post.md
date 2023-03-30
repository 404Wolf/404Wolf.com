# Background

![Example DNA nanotube](example_nanotube.webp|width=19)

Structural DNA nanotechnology takes a synthetic spin on the organic molecule of DNA, using it like hackable nanoscale clay. By taking advantage of Watson-Crick base pairing to conjoin DNA strands, bionanotechnologists are able to create a wide array of highly customizable, self-assembling, rigid nanostructures with precision of up around 1nm. Applications for DNA nanotech is quite extensive, and ranges from drug delivery and tissue wound repair to nanophotonics and much more. However, my project/research focuses specifically on DNA nanotube design.

The nanotubes I've focused on consist of multiple double helices running parallel to each other as to form hollow, tubular shapes. Even with these constraints, design is complex, and there are many different possible tubes. The design process involves identifying a tube shape consistent with the intrinsic geometry of a DNA double helix, aligning helices, placing connections between helices as to generate minimal strain, and determining base sequences. Often these nanotubes utilize DNA origami, in which a long viral strand is folded into shape by short "staple strands." 

While the process needed for nanotube design has been known for a while, up until NATuG there's been no good computational tool specifically dedicated to their design. Previously bionanotechnologists could utilize a complex spreadsheet tool allowing users to plot the side view and top view, but it could only support a fixed number of double helices (given the nature of spreadsheets), and did not provide the necessary interactivity that NATuG offers. NATuG provides much more functionality, including the ability to create linkages, did not allow for nicks, and did not apply and eventually export strand sequences, which allows for the critical leap from theory to test tube.

# The program

![Side view plot](side_view_plot.webp|width=30)

Simply put, NATuG is a Python-based desktop application that streamlines the DNA nanotube design process. The program allows users to easily set the angles between double helices as to change the overall shape of the tube, while computing a top and side view plot in real time. NATuG automatically lines up the double helices as to allow for cross-strand exchanges to hold together the structure. With a single click on overlapping NEMids, NATuG automatically swerves the strands across double helices, creating a cross-strand exchange. By strategically placing junctions throughout the structure, the isolated double helices become a unified, rigid nanotube. It provides an intuitive interface, allowing one to customize and visualize the nanotube shape, weave together helices in a matter of clicks, and apply/export sequences. While designing DNA nanotubes is a multistage endeavor, NATuG aims to make the process as dynamic as possible—letting users easily traverse the nanotube design process with ease. 

## The journey

When starting work on NATuG, I needed to start off choosing my UI and plotting framework, which would inevitably be a vital part of the program. Ultimately, I settled on a [QT-based](https://www.qt.io/) UI framework, and Python as the primary language, given my experience with the paradigms of the language, and comprehensibility of the GUI toolkit. Though the project was my first time with UI design, it was a great learning experience, and I got to learn more advanced Python, including inheritance for the first time, unfamiliar datastructures, numpy, and more. While many Python projects choose to implement [matplotlib](https://matplotlib.org/) as their plotting framework, I elected to use [pyqtgraph](https://www.pyqtgraph.org/) because of its thorough intractability with PyQt, and thus far it's worked great. It's able to track clicks on individual points, and update in real time. As I began work on NATuG, I started noticing a trend, wherein as I were to implement features I would constantly be refactoring the prior codebase to allow for future program expansion, but also to stay organized. Thankfully, as the program progressed I've gotten better at utilizing Git and pre-planning implementations, so overhauling has become less of a headache.


# Getting started

![NATuG interface](interface.webp|width=19)

This project began when I wrote about my passion for code in an about-me paragraph for a physics class. A few weeks later, my professor, Dr. William Sherman, reached out mentioning that he could use help with an ongoing project. After a few meetings to discuss the coding facet of the project, and the biophysical background needed for the task, I was ready to dive in. We began meeting, and the project took off. I've done all the coding for the project, while working closely with Dr. Sherman to craft the software with the end user in mind, and to ensure that features implemented are physically accurate and sufficiently configurable.

## Features

![NATuG's first plot](first_top_view.webp)

My first step with the program, before building a complex, mult-widget UI, was to actually implement side and top view visualization plots. And for this, I began in Excel, tinkering with parameters while working on grasping the already known plotting algorithm I'd be using. NATuG consists of two very different plots, wherein the plotting procedure is extremely different for each.

### The plots

![Heart shaped tube](heart_tube.webp)
![Symmetrical design](symmetric_design.webp)

The top view plot displays a video of the nanotube from the top down, showing the overall shape of the tube. It allows the user to better visualize what they are actually constructing. As one tinkers with the inter-domain angles, the actual shape of the tube changes, and it is the responsibility of the top view plot to display the changes. I also added the ability to click on helical domains (the circles) in the top view plot to automatically pan the side view plot to location showcasing the nucleosides in that region.

![Creating cross-strand exchanges](creating_junctions.webp|width=9)

The side view provides a view as if the nanotube had been unrolled flat, and is strategically distorted as to show all the nucleosides of the nanostructure. This plot is much more complex and feature-rich than the top view plot, since it allows for user interaction with the actual nucleosides. It allows users to create nicks in strands, conjunct strands, link together the ends of strands to allow for DNA origami designs, and more. Lots of work has gone into converting the underlying strand datastructure that I created into a pyqtgraph plot widget that has signals properly hooked up as to allow the user to manipulate the strands.

### The interface

![Multi-panel UI beginnings](beginnings_of_ui.webp)

The primary goal of NATuG has been to make the nanotube design experience as pain-free and intuitive as possible. So, not only have I had to learn how to actually go about creating UIs, but I've also had to figure out the best way to position and size elements to make clear how to utilize the program. Ultimately, I choose to go with a three panel UI, with an undockable multi-use, tabbed configuration panel and a resizable top/side view plot area. Through the project I've come to enjoy UI design, though not quite as much as implementing innerworkings. 

### Junctions!

![Possible junction types](junction_types.webp|width=17)

One of the most important features of NATuG is the ability to create cross-strand exchanges. These exchanges implement "Holliday" junctions to allow strands to swerve across their helical domains, weaving together the nanostructure. This was definitely the most difficult to implement part of the project, since previous works showed that junctions were possible, but relied on intuition to determine how to go about making them. This makes sense, since if you look at a side view helix plot, it is fairly obvious to a human how to conjunct the strands. This was definitely one of my favorite parts of the project, since it was both challenging and rewarding to catalog the various cases. Unrelated: this was a classic case of [Moravec's Paradox](https://en.wikipedia.org/wiki/Moravec%27s_paradox), which is definitely an interesting read.

After extensive tinkering and cogitating, I've come to the (still not definite) conclusion that there are a distinct amount of different possible cases for conjunction the strands of two arbitrary nucleoside-end midpoints, which are outlined in the tree to the right. As it turned out, there were specific pathways to the subcases, dependent on the closedness of the strands of the NEMids and whether the NEMids are in the same strand.

# The present

Ultimately NATuG shows the powerful potential of software to allow for more complex, larger-scale tube structures. Interestingly, we also realized that the program holds the potential for non-closed tile design, which is common in the realm of DNA origami. While there are other tools that are more sophisticated and perhaps better suited for this specific purpose, NATuG provides a uniquely user friendly and convenient experience. 

As I complete the initial version of the program, Professor Sherman and I are beginning to draft a paper for NATuG, which we intend to submit for publication to a peer reviewed journal. We hope to discuss some of the potential shapes of nanotubes that can be created, the way that the program tackles conjoining strands, and the like. We've also informally shared the project at NYU's Nadrian Seeman Memorial Symposium, and we are hoping to present at my school's annual symposium. 

## The future

In the future I'll be updating this project with more nitty-gritty details about how the program works, more about what I learned/my journey, and more. Stay tuned!

## Learn more
This post discusses the needed background to understand what NATuG does and is, and talks a bit about my journey in coding the program. **If you're interested in the research underpinning behind the project, [here it is](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1471877/).** **Also, [here is a poster I created showcasing the project](/posts/projects/DNANanotubes/resources/NATuG_poster.pdf).**

If you're interested in learning more about how to actually set up and use the program, check out its **[user manual](https://github.com/NATuG3/Manual/blob/main/manual.pdf)** and **[Github repository](https://github.com/NATuG3/NATuG3)**. Also, feel free to reach out if you have any questions.