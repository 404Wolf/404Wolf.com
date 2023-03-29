# Getting started

This project began when I wrote about my passion for code in an about-me paragraph for a physics class, and then the professor, Dr. William Sherman, reached out mentioning that he could use help with an ongoing project. After a few quick meetings to discuss the coding facet of the project, and the biophysical background needed for the task, I was ready to dive in. We began meeting, and the project took off. 

# Background

Structural DNA nanotechnology takes a synthetic spin on the organic molecule of DNA, using it like hackable nanoscale clay. By taking advantage of Watson-Crick base pairing to conjoin DNA strands, bionanotechnologists create a wide array of highly customizable, self-assembling, rigid nanostructures, with precision of up around 1nm. Applications for DNA nanotech range from drug delivery and tissue wound repair to nanophotonics and much more. However, my research focuses specifically on DNA nanotube design.

The nanotubes I've focused on consist of multiple double helices running parallel to each other, as to form hollow, tubular shapes. The design process involves identifying a tube shape consistent with the intrinsic geometry of a DNA double helix, aligning helices, placing connections between helices as to generate minimal strain, and determining base sequences. Often these nanotubes utilize DNA origami, in which a long viral strand is folded into shape by short "staple strands." 

# The program

## The short description

NATuG is a Python-based desktop application that streamlines the DNA nanotube design process. The program allows users to easily set the angles between double helices as to change the overall shape of the tube, while computing a top and side view plot in real time. NATuG automatically lines up the double helices as to allow for cross-strand exchanges to hold together the structure. With a single click on overlapping NEMids, NATuG automatically swerves the strands across double helices, creating a cross-strand exchange. By strategically placing junctions throughout the structure, one can transform isolated double helices into a rigid nanotube. It provides an intuitive interface, allowing one to customize and visualize the nanotube shape, weave together helices in a matter of clicks, and apply/export sequences. While designing DNA nanotubes is a multistage endeavor, I've tried to make NATuG as dynamic as possible—letting users easily traverse the nanotube design process with ease. 

## The not-as-short description

### Getting started

When starting work on NATuG, I settled on a [QT-based](https://www.qt.io/) UI framework, and Python as the primary language, given my experience with the paradigms of the language, and comprehensibility of the GUI toolkit. Though the project was my first time learning how to design UIs, it was a great learning experience, and I got to learn more advanced Python, including inheritance for the first time, unfamiliar datastructures, numpy, and more. Additionally, it's only reinforced why I love coding so much: its deep interdisciplinarity. The ability to apply code to a project like this has opened my eyes to its immense versatility and profound necessity in the sciences. 

### Features added

![NATuG's first plot](first_top_view.webp)
![Heart shaped tube](heart_tube.webp)

My first steps with the program, before building a complex, mult-widget UI, were to actually implement side and top view visualization plots. The top view plot provides a visual representation of the overall shape of the nanotube. The side view provides a view as if the nanotube had been unrolled flat, and is strategically distorted as to show all the nucleosides of the nanostructure. While many Python projects choose to implement [matplotlib](https://matplotlib.org/) as their plotting framework, I elected to use [pyqtgraph](https://www.pyqtgraph.org/) because of its thorough intractability with PyQt, and thus far it's worked great. It's able to track clicks on individual points, and update in real time.

![Multi-panel UI beginnings](beginnings_of_ui.webp)
![Current interface](interface.wepb)

The primary goal of NATuG has been to make the nanotube design experience as pain-free and intuitive as possible. So, not only have I had to learn how to actually go about creating UIs, but I've also had to figure out the best way to position and size elements to make clear how to utilize the program. While at the beginning stages of NATuG progress was directed towards building up an overall user interface, it was not long before I got to the real meat of the endeavor: cross-strand exchanges.

![Creating cross-strand exchanges](creating_junctions.webp)
![Possible junction types](junction_types.webp|width=21)

One of the most important features of NATuG is the ability to create cross-strand exchanges. These exchanges implement "Holliday" junctions to allow strands to swerve across their helical domains, weaving together the nanostructure. After extensive tinkering and cogitating, I've come to the (still not definite) conclusion that there are a distinct amount of different possible cases for conjunction the strands of two arbitrary nucleoside-end midpoints, outlined in the table to the right.

# Current state

If you're interested in learning more about how to actually set up and use the program, check out its [user manual](https://github.com/NATuG3/Manual/blob/main/manual.pdf) and [Github repository](https://github.com/NATuG3/NATuG3).

# The future

As I complete the initial version of the program, Professor Sherman and I are beginning to draft a paper for NATuG, which we intend to submit for publication to a peer reviewed journal. We hope to discuss some of the potential shapes of nanotubes that can be created, the way that the program tackles conjoining strands, and the like. We've also informally shared the project at NYU's Nadrian Seeman Memorial Symposium, and we are hoping to present at my school's annual symposium. 

## Further updates
In the future I'll be updating this project with more nitty-gritty details about how the program works, what I learned, and more. Stay tuned!
