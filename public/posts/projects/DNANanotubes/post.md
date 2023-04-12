# Background

![Example DNA nanotube](example_nanotube.webp|width=30|float=right)

Structural DNA nanotechnology is a unique field of science that takes advantage DNA's simple base pairing, self-assemblability, structural rigidity, and ease of synthesis to create synthetic structures. With the technology, one can create a wide array of highly customizable, self-assembling, rigid nanostructures with precision of up around 1nm, and applications ranging from nanophotonics (altering light wavelengths by passing light through tiles of the DNA), to DNA based computing, to DNA-based sensors, and much more. The field is still developing, and new applications are sprouting constantly. My research project focuses specifically on DNA nanotube design.

There are many different forms of nanotubes that can be created, but they are all somehow alterations of a hollow, tubular structure. As seen in the image to the right, they involve conjoining many cylindrical DNA double helices with cross-strand exchanges. DNA nanotubes possess significant potential for use in targeted drug delivery, tissue wound repair, and much more. The specific form of nanotube that I've focused on consist of multiple double helices running parallel to each other. Yet, even with these constraints, design is complex, and there are many different possible tubes. The design process involves identifying a tube shape consistent with the intrinsic geometry of a DNA double helix, aligning helices, placing connections between helices as to generate minimal strain, and determining base sequences. Often these nanotubes utilize DNA origami, in which a long viral strand is folded into shape by short "staple strands."

While the process needed for nanotube design has been known for a while, up until NATuG there's been no good computational tool specifically dedicated to their design. Previously bionanotechnologists could utilize a complex spreadsheet tool, allowing users to plot the side view and top view, but it could only support a fixed number of double helices (given the nature of spreadsheets), and did not provide the necessary interactivity that my program, NATuG, offers. NATuG provides much more functionality, including the ability to create linkages, did not allow for nicks, and did not apply and eventually export strand sequences, which allows for the critical leap from theory to test tube. Interestingly, NATuG also allows for the creation of non-tubular structures, however there is already sophisticated software available for such designs.

# The program

![Side view plot](side_view_plot.webp|float=right)

Simply put, NATuG is a Python-based desktop application that is designed to streamline the DNA nanotube design process. The program allows users to easily set the angles between double helices as to change the overall shape of the tube, while computing a top and side view plot in real time. NATuG automatically lines up the double helices as to allow for cross-strand exchanges to hold together the structure. With a single click on overlapping nucleoside midpoints, NATuG automatically swerves the strands across double helices, creating a cross-strand exchange. Additionally, users can easily interact with specific nucleosides of the structure, create nicks and linkages, and more. By strategically placing junctions throughout the structure, the isolated double helices become a unified, rigid nanotube. The program provides an intuitive interface, allowing one to customize and visualize the nanotube shape, weave together helices in a matter of clicks, and apply/export sequences. So, while designing DNA nanotubes is a multistage endeavor, NATuG aims to make the process as dynamic as possible—letting users easily traverse the nanotube design process with ease. 

# My journey

## Prior versions

![NATuG 2.0](NATuG2.webp|float=right)

The version of NATuG outlined here is actually not the first version of NATuG. As aforementioned, the initial version of NATuG was a complex spreadsheet tool wherein one could input the parameters of the DNA, along with angles to configure tube shape, and obtain Excel plots. However, there indeed was a second version of the program, written in Python 2, that was more advanced and allowed for larger structures. The project was abandoned a while back, and at the time was limited to only a single cross-strand exchange type, which is insufficient for the design of structurally integral DNA nanotubes. This version of NATuG takes much inspiration from the interface of the previous versions, but is also original in many ways, and has many more features than its predecessors.

## Getting involved

My involvement in the project began after I wrote about my passion for code in an about-me paragraph for a physics class. A few weeks later, my professor reached out mentioning that he could use help with an ongoing project. And, after a few meetings to discuss the coding facet of the project, and the biophysical background needed for the task, I was ready to dive in. We began meeting, and the project took off. I've done all the coding for the project, while working closely with Dr. Sherman to craft the software with the end user in mind, and to ensure that features implemented are physically accurate and sufficiently configurable.

## Getting started

![NATuG interface](interface.webp|float=right)

When starting work on NATuG, I needed to start off choosing my UI and plotting framework, which would inevitably be a vital part of the program. Interactivity would be key, along with, ideally, a large amount of plug-and-play widgets to choose from. Ultimately, I settled on [QT's](https://www.qt.io/) UI framework, and Python as the primary language, given my experience with the paradigms of the language, and comprehensibility of the toolkit. Though the project was my first time with UI design, it was a great learning experience. For the plotting framework, though many to most Python projects implement [matplotlib](https://matplotlib.org/) as their, I elected to use [pyqtgraph](https://www.pyqtgraph.org/) because of how well it integrates with PyQt, and support for much needed interactivity. It's able to track clicks on individual points, and update in real time.

## Adding features

![NATuG's first plot](first_top_view.webp|float=right)

My first step with the program, before building a complex, multi-widget UI, was to actually implement side and top view visualization plots. And for this, I began in Excel, tinkering with parameters while working on grasping the already known plotting algorithm I'd be using. Of course, Excel's plotting capabilities are much more limited than that of programic plotting in Python with pyqtgraph, and I'd have a lot I'd need to learn.

## The plots

NATuG consists of two plots: the **top view plot** and the **side view plot**. Both plots display the same nanostructures, but from two different perspectives.

### Top View Plot

![Heart shaped tube](heart_tube.webp)
![Symmetrical design](symmetric_design.webp)

The top view plot displays a view of the nanotube from the top down, showcasing the overall shape of the tube. It allows the user to better visualize what they are actually constructing. As one tinkers with the inter-domain angles, the actual shape of the tube changes. Each circle represents a DNA double helix, and the fact that they all touch and eventually close up indicates that it is a closed tube. I've also made it so that if you click on a specific double helix in the top view plot, NATuG automatically pans to the side view plot location that has information on the nucleosides in that region.

### Side View Plot

![Creating cross-strand exchanges](creating_junctions.webp|width=25|float=right)

The side view provides a view as if the nanotube had been unrolled flat, and is strategically distorted as to show all the nucleosides of the nanostructure without overlaps. This plot is much more complex and feature-rich than the top view plot, since it allows for user interaction with the actual nucleosides. It allows users to create nicks in strands, conjunct strands, link together the ends of strands to allow for DNA origami designs, and more. Lots of work has gone into converting the underlying datastructure for strands into a visualized pyqtgraph plot widget that has signals properly hooked up as to allow the user to manipulate the state.

### Future Plots

In the future, there's many other types of plot improvements, and even entirely new plots that could be contrived. For instance, we have spent some time discussing the possibility of creating a 3D plot, to visualize the tube from any given perspective at once.

### The interface

![Multi-panel UI beginnings](beginnings_of_ui.webp|float=right)

The primary goal of NATuG has been to make the nanotube design experience as pain-free and intuitive as possible. So, not only have I had to learn how to actually go about creating UIs, but I've also had to figure out the best way to position and size elements to make clear how to utilize the program. For the UX design, I choose to go with a three panel UI, with an undockable multi-use, tabbed configuration panel and a resizable top/side view plot area. This allows the user to view the different plots simultaneously or one at a time, while always having access to the configuration.

### Junctions!

![Possible junction types](junction_types.webp|width=80|float=none)

One of the most important features of NATuG is the ability to create cross-strand exchanges. These exchanges implement "Holliday" junctions to allow strands to swerve across their helical domains, weaving together the nanostructure. This was definitely the most difficult to implement part of the project, since previous works showed that junctions were possible, but relied on intuition to determine how to go about making them. This makes sense, since if you look at a side view helix plot, it is fairly obvious to a human how to conjunct the strands. This was definitely one of my favorite parts of the project, since it was both challenging and rewarding to catalog the various cases. Unrelated: this was a classic case of [Moravec's Paradox](https://en.wikipedia.org/wiki/Moravec%27s_paradox), which is definitely an interesting read.

After extensive tinkering and cogitating, I've come to the (still not definite) conclusion that there are a distinct amount of different possible cases for conjunction the strands of two arbitrary nucleoside-end midpoints, which are outlined in the tree to the right. As it turned out, there were specific pathways to the subcases, dependent on the closedness of the strands of the NEMids and whether the NEMids are in the same strand.

# The present

NATuG showcases the powerful potential of software to allow for more complex, larger-scale tubular DNA nanostructures. The program allows the user to spend less time doing tedious computations, and more time focusing on the actual design of the structure. Additionally, with the ability to load and export structures into and out of NATuG, we expect collaborative design to become much more streamlined. Additionally, we also realized that the program holds the potential for non-closed tile design, which is common in the realm of DNA origami. While there are other tools that are more sophisticated and perhaps better suited for this specific purpose, NATuG provides a uniquely user friendly and convenient experience. 

As I complete the initial version of the program, Professor Sherman and I are beginning to draft a paper for NATuG, which we intend to submit for publication to a peer reviewed journal within the next few months. We hope to discuss some of the potential shapes of nanotubes that can be created, the way that the program tackles conjoining strands, and the like. We've also informally shared the project at NYU's Nadrian Seeman Memorial Symposium, and we are hoping to present at my school's annual symposium. 

## The future

In the future I'll be updating this project with more nitty-gritty details about how the program works, more about what I learned/my journey, and more. Stay tuned!

## Learn more
This post discusses the needed background to understand what NATuG does and is, and talks a bit about my journey in coding the program. **If you're interested in the research underpinning behind the project, [here it is](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1471877/).** Also, [here is a poster I created showcasing the project](/posts/projects/DNANanotubes/resources/NATuG_poster.pdf).

If you're interested in learning more about how to actually set up and use the program, check out its [user manual](https://github.com/NATuG3/Manual/blob/main/manual.pdf) and [Github repository](https://github.com/NATuG3/NATuG3). Also, feel free to reach out if you have any questions.