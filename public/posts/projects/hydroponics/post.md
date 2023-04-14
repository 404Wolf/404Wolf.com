# The roots

## Starting off

![The Roots](roots.webp|float=right)

It was 2019, the summer before high school. Many projects were coming to a close, and schoolwork hadn't yet picked up. My vinyl wall Office-Quote sticker endeavor had completed; my 3d-printed avocado production had died down. My interest in tech was beginning, and I craved learning Arduino through a practical and applied way before high school. Since my closet had just freed up from my Kombucha brewing apparatus, it was ripe for project-iation. I wasn't ready to let it sit dormant, so I decided to transform the closet into an automated garden. I'd had some experience working with water pumps in simple circuits where I work, but would need to learn how to integrate a sensor and arduino. The first decision for the project: what to grow.

# Moldy Strawberries

## Setup

![Strawberry Grow Tower](strawberry_tower.webp|float=right)

My research began by exploring fast growing, easily maintainable plants. I really wanted to grow avocados, but they take a very long time to grow, and once they reach maturity the avocados themselves take a while to regenerate. Berries seemed to be an appealing choice, given their quick germination and grow time. I ended up settling on strawberries specifically, since there are [stackable grow towers](https://www.amazon.com/Amazing-Creation-Strawberries-Vegetables-Succulents/dp/B07BSX6R31) available. When the seeds and grow towers arrived, I'd finished cleaning out my closet and moving out my cloths dresser. I set up an Arduino system to automatically disperse water from a large bucket when the soil dried up, using a soil moisture sensor, and covered the closet walls in mylar sheeting (silvery reflective plastic) to maximize the light hitting the plants. I purchased a small relay and ran the positive wire of an extension cord across it, so I could control the lights with the Arduino (on a timer) too. 

The system was complete and operational. The seeds did germinate as anticipated, but the watering system wasn't working quite as expected. As time progressed, it didn't water often enough, however, and when reconfigured it tended to over-water and leak water. Because of this, I decided to pivot to timer-based-watering. This was less ideal, but still worked fine given the highly consistent atmosphere of a closet. For the grow lights, I initially settled on a cheap Amazon grow light, which melted itself and set off my GFCI outlet. Though scary, I did go into this planning for the worst, and had made the conscious choice to wire an extension cord from a laundry machine protected outlet given the risk of water spillage. The replacement lights I bought were definitely better, but still weren't bright enough for the flourishing strawberries. In the end, cheaping out wasn't worth it, so I bought higher quality more powerful bar lights. This third choice worked well, but it heated up my closet to an ambient 85 and drew 90 watts of power. Unideal it may be, but it was operational, so I stuck with it.

## Success-ish

![Strawberry Fruit](strawberries.webp|width=24|float=right)

Within a few weeks, and the plants were thriving. They began branching out, and runners (baby plants attached to the mother plant) started shooting out. Cutting off runners became a daily chore, and I even saved a few to grow extra plants in external pots for gifts. Flowers appeared, and then the first few fruits sprung out. I began using fertilizer at this stage, worried that the soil would be depleted of nutrients with the new fruit. The strawberries were indeed juicy, bright red, and aesthetically perfect. But the success didn't last much more than a week, which is when the mold started. I tried adding a small dehumidifier from Amazon, and drilled a whole in the water tank to redirect the collected water back into the plant watering reservoir. I bought Neem oil as a natural fungicide to protect the edibility of the fruit, but it was futile (although it did seem to deter flies). It was a moist, enclosed setting, with plants growing in dirt, so this was inevitable. After caving to synthetic fungicide and successfully ridding the plants of fungus, I had effectively made them ornamental for months to come. So, in the meantime I began planning for the next season. This time, I'd be prepared. And dirt-less.

# Hydroponic Transition

## The Transition

![The transition](strawberry_tubing.webp|width=30|float=right)

Through the previous strawberry endeavor, I learned a lot. Keeping the environment clean is key, and consistency maximizes yield. This time around I decided that, while the Arduino was fun, a more robust system would be needed. I chose to implement hydroponics, a technique wherein the plants grow with their roots directly in nutrient water/nutrient mist, to eliminate dirt. I also opted for [preventative biofungicide](https://southernag.com/product/garden-friendly-fungicide/), which utilizes the bacterium *Bacillus amyloliquefaciens* to 'eat' fungus. Numerous studies have found it to be highly effective and non-toxic; in fact, it's a naturally occurring 'good' bacterium in soil. For the seeds, I bought generic basil seeds, which I'd soon realize was highly unideal. For the germination medium, I went with rockwool (instead of a make-shift paper towel like I did for the strawberries). Rockwool is a fluffy stuffing-like material, used most frequently in insulation, but also commonly botanically.

## Assembled Grow Tower

![Basil grow rack](basil_tower.webp|width=30|float=right)

For my first attempt, I decided to go with an Amazon [basil grow rack](https://www.amazon.com/gp/product/B0787F9LG7/), since it claimed to provide an all-in-one system that could assemble quickly and easily. A bit weary of leakage, I carefully put it together, and placed my basil seeds into the included grow pods. For the first few weeks, while figuring out ideal nutrient ratios and water acidity, the basil did successfully began growing. However, I quickly ran into a roadblock: the small tubes were being jammed by the ever-growing plants' roots. The larger they got, the more unwieldy the system became, and the less water they received. Moreover, cleaning the system was virtually impossible without removing all the plants and disassembling the tubes, since the roots were jamming themselves in the tubes. Unfortunately, I needed to change gears, but, on the brighter side, I did establish hydroponic basil as a plant with potential.

## Custom Vertical Tower

![Hydroponic vertical grow tower](hydroponic_grow_tower.webp|width=18|float=right)

The first idea for the overhaul was to build a vertical [hydroponic grow tower](https://extension.okstate.edu/fact-sheets/building-a-vertical-hydroponic-tower.html). In the setup, a pump would turn on every 10 minutes for 10 minutes, carrying water to the top of the system, and letting it drip on and drench the roots. Vertical systems like the one pictured don't require an additional air system, since the roots are constantly exposed to direct air. Another key advantage is space efficiency: whereas in typical systems the plants height is limited because of bushing tendencies, with a vertical system the space of my closet could be maximized by having multiple towers of the height of my closet. Instead of buying a kit this time, I made my own vertical system by drilling holes along a large PVC tube, and then placing smaller segments of tube within the holes. Unfortunately the product didn't work out, since my pump was so powerful as to propel water out and along the edges of the tube, wetting the outside of the central tower and fostering algae. Additionally, the tower itself was particularly difficult to keep upright, even amidst many ropes and wires, and since this setup involves water dripping down the central tube, it was extremely loud. It was disappointing, but I wasn't defeated. It was time for another method.

# Deep Water Culture

![Deep water culture system](deepWaterCulture.webp|float=left)

My first success: deep water culture (DWC) hydroponics. In DWC hydroponics, plant roots are suspended in a nutrient-rich water solution, with airstones constantly pumping air into the water, allowing the roots to maximally absorb the nutrients and minerals. The system itself is extremely simple on paper, but requires managing large reservoirs of liquid—ensuring that they hover around the right acidity level, that there's the right fertilizer amount, and that they stay fungus-free. The approach seemed much more feasible than any of my prior systems, since I'd just need a few bins and grow baskets. Agog to proceed, I got to work planning.

## Setup

![Grow baskets](grow_baskets.webp|float=right)

To start, I purchased [three large storage containers from Lowes](https://www.lowes.com/pd/Style-Selections-30-Gallon-120-Quart-Gray-Tote-with-Standard-Snap-Lid/1000183149). While food safety is obviously of importance, food grade bins are astronomically expensive, so I settled on bins with food-safe plastic composition, even though they weren't technically rated food grade. My plan was to use a [super large 3" drill bit](https://www.amazon.com/gp/product/B07ZRVM7WM/) and some [3" grow baskets](https://www.amazon.com/dp/B08CGVL9FW) filled with pebbles to hold the plants in place. The air pumps I used were initially small bubblers, but, after later learning that 1 wat of air pumping power per liter of liquid is the general practice in hydroponics, went with [two commercial air pumps](https://www.amazon.com/gp/product/B078H92695/). Since they were extremely loud, I also threw in some [vibration dampening pads](https://www.amazon.com/gp/product/B0042U92TE/) that cut down on the sound a bit, and placed a dollar-store fan above the air pumps to prevent overheating.

### Progress

![Baby plants](baby_pepper.webp)
![Early growth](early_growth.webp)
![Pruning basil](pruning_basil.webp)

The system was all set up, so now all that was left was to wait. The plants germinated flawlessly, and were quickly ready to be placed into the pebble-stuffed grow cups. The tanks were full and fertilized, and the air pumps and lights' timers had been configured properly in advance. The new DWC setup worked like magic, requiring extremely low maintenance and yielding extremely high loads of basil. Unlike my strawberries, there was no soil involved, so the setup was significantly cleaner and more maintainable. Something that I quickly learned is that basil **requires** meticulous pruning to maximize yield, which explains why the basil from my previous tower-approach grew as vertical stalks. By cutting between the leaf stalks, I was able to get the plant to branch out into a bush, rather than the tall stalks I had in my older systems. With such rapid growth, the harvests quickly began rolling in. It was finally time to start producing pesto.

## Pesto Production

![Pesto-packed freezer](frozen_pesto.webp)
![A harvest](a_harvest.webp)
![Bowl of pesto](pesto_bowl.webp)

While indeed the basil tasted great as a salad mix-in and pasta topper, pesto was the inevitable real deal. It was one of the primary reasons I chose basil: as the plants grew beyond my appetite, it'd be super easy to freeze the final product. For the first few rounds of pesto, I kept it super simple, just blending together basil, salt, and a bit of olive oil and garlic. As the batches went on, I started getting more creative, experimenting with adding walnuts and almonds, along with weirder ingredients like kale and hot peppers. Each week I reaped around 2 cups of pesto, which I froze in ice cube molds and then zip locked, so that I could microwave one cube at a time as needed. Over the weeks, the freezer filled with pesto, and, even two years later we still have a seemingly endless supply.

## Basily Takeaways

The deep water culture system seemed to be the best route, yielding the greatest amount of basil while being extremely easy to maintain. I decided to keep up the system for a few years, slowly building off of prior years by improving the setup. I switched to [special basil seeds](https://extension.umn.edu/disease-management/basil-downy-mildew), which have been bred to be resistant to the most common basil illness downy mildew. During my first few years I worried that the basil had mites, but shortly learned that they were in fact the buds of roots. I also spraypainted the bins with a layer of opaque black, followed by two layers of white, to prevent light from penetrating the water and causing algae. I also upgraded my air stone system to new, larger disc airstones, which provide a much steadier and higher quality flow of air. I also installed a fan in the ceiling of the closet, along with two smaller fans on the walls, aimed at the plants and machinery. Since the fans use lots of electricity, they are set on timers to turn off an hour after the lights, and on when the lights turn on. And finally, I've switched my rope out paracord, which is much more durable, easier to work with, and overall sleeker.


# The New Shishitos

## The choice

![Current setup](new_cording.webp|width=36|float=right)

With my optimized system already assembled and ready for the next year's plant, I've entered research mode once more. Basil was great because of how rapidly it grew, but, equally important, that its product (pesto) could be frozen. Surfing through the vast array of potential hydroponic candidates, including tomatos, bell peppers, lettice, spinach, and more, I eventually settled on Shishito peppers. They were the perfect match: tasty, roast-able, and freezable. And, most importantly, unlike many other types of peppers, they're particularly fast growing.

## Progress

![Peppers (exterior view)](outside_closet_view_of_peppers.webp)
![Peppers (side view)](peppers_side_view.webp)

Since germination, the peppers have been growing rapidly, day after day. After some research, I learned that in the past I'd been using way less fertilizer than I could have been, so I've increased my concentration. Additionally, I quickly learned that the new, cheaper tubing that I purchased this year was completely unsuitable for my purposes, as the acidic water quickly ate away at the plastic, and the tubing began to leak. My check valves (valves that you put on a tube that force water to only travel in one direction) worked, preventing the water from entering the expensive electric air pumps, but still allowed the water to leak onto my floor. Luckily I'd installed some water sensors on the floor, and was able to quickly dry the floor. Since this incident, I moved the air pumps to a higher location (even though the check valves worked, I was scared of the possibility of them not working, and having the water pumps higher up would make it impossible for the water to backflow into the pumps). I switched to a much higher quality PVC clear tubing, and have had no issues since.

![Lights on!](peppers_side_view_lights_on.webp|float=right)

At this point there are no actual peppers on the plants. The fertilizer I've been using is optimized for foliage growth, so I'm fairly certain that that has been why the peppers haven't begun to grow. Soon I'll be switching to a different fertilizer, which is optimized for fruit growth, which should kickstart flowering. After a bit of research, I've also come to find that peppers require pollination in order to produce fruit, so, while there is indeed a notable wind current in the closet due to the fans, it may not be enough, and I may need to learn how to manually pollinate the plants. Since this is an ongoing project, I'll be sure to keep updating this post as the peppers grow (and hopefully eventually make it into my freezer \[and stomach!\]).