# The roots

## Starting off

![The Roots](roots.webp|float=right)

It was 2019, the summer before high school. Many projects were coming to a close, and schoolwork hadn't yet picked up. My vinyl wall Office-Quote sticker endeavor had completed; my 3d-printed avocado production had died down. My interest in tech was beginning, and I craved learning Arduino through a practical and applied way before high school. Since my closet had just freed up from my Kombucha brewing apparatus, it was ripe for project-iation. I wasn't ready to let it sit dormant, so I decided to transform the closet into an automated garden. The first decision: what to grow.

# Moldy Strawberries

## Setup

![Strawberry Grow Tower](strawberry_tower.webp|float=right)

My research began by exploring fast growing, easily maintainable plants. Berries seemed to be an appealing choice, given their quick germination and grow time, so I settled on strawberries. When the ebay seeds and grow towers arrived, I'd finished cleaning out my closet and moving out my cloths dresser. I specifically chose [stackable grow towers](https://www.amazon.com/Amazing-Creation-Strawberries-Vegetables-Succulents/dp/B07BSX6R31) so that I could expand as needed, and match the towers to the height of my closet. Meanwhile, I set up an Arduino system to automatically disperse water from a large bucket when the soil dried up, using a soil moisture sensor, and covered the closet walls in mylar sheeting to maximize the light hitting the plants. I purchased a small relay and ran the positive wire of an extension cord across it, so I could control the lights with the Arduino too. As time progressed, it didn't water often enough, however, and when reconfigured it tended to over-water and leak water, so I pivoted to timer-based-watering. For the grow lights, I initially settled on a cheap Amazon grow light, which melted itself and set off my GFCI outlet. The replacement one I got was better, but still wasn't bright enough, and then the third choice worked well, though it heated up my closet to an ambient 85 and drew 90 watts of power.

## Success

![Strawberry Fruit](strawberries.webp|width=24|float=right)

Within a few weeks, most of the strawberries germinated, and the plants were soon thereafter thriving. They began branching out, and runners (baby plants attached to the mother plant) started shooting out. Flowers appeared, and then the first few fruits sprung out. They were juicy, bright red, and perfect. But the success didn't last much more than a week, when the mold started. I tried adding a dehumidifier, and bought Neem oil as a natural fungicide to protect the edibility of the fruit, but it was futile. It was a host, moist, enclosed setting, with plants growing in dirt. After caving to synthetic fungicide and successfully ridding the plants of fungus, I had effectively made them ornamental for months to come. So, in the meantime I began planning for the next season. This time, I'd be prepared.

# Hydroponics

## The Transition

![The transition](strawberry_tubing.webp|width=28|float=right)

Through the previous strawberry endeavor, I learned a lot. Keeping the environment clean is key, and consistency maximizes yield. This time around I decided that, while the Arduino was fun, a more robust system would be needed. I chose to implement hydroponics, a technique wherein the plants grow with their roots directly in nutrient water, to eliminate dirt. This time, I also opted for [preventative biofungicide](https://southernag.com/product/garden-friendly-fungicide/), which utilizes the bacterium _Bacillus amyloliquefaciens_ to 'eat' fungus, which is proven effective, and is completely human-safe—in fact, it's a naturally occurring bacterium in soil. As it turned out, the hydroponic world is vast, and there are many techniques and options available. Additionally, I purchased [special basil seeds](https://extension.umn.edu/disease-management/basil-downy-mildew), which have been bred to be resistant to the most common basil illness: downy mildew.

## Assembled Grow Tower

![Basil grow rack](basil_tower.webp|width=28|float=right)

For my first attempt, I decided to go with an Amazon [basil grow rack](https://www.amazon.com/gp/product/B0787F9LG7/), since it claimed to provide an all-in-one system that could assemble quickly and easily. A bit weary of leakage, I carefully put it together, and placed my basil seeds into the included grow pods. For the first few weeks, while figuring out ideal nutrient ratios and water acidity, the basil did successfully began growing. However, I quickly ran into a roadblock: the small tubes were being jammed by the ever-growing plants' roots. The larger they got, the more unwieldy the system became, and the less water they received. Moreover, cleaning the system was virtually impossible without removing all the plants and disassembling the tubes, since the roots were jamming themselves in the tubes. Unfortunately, I needed to change gears, but, on the brighter side, I did establish hydroponic basil as a plant with potential.

## Custom Vertical Tower

![Hydroponic vertical grow tower](hydroponic_grow_tower.webp|width=18|float=right)

The first idea for the overhaul was to build a vertical [hydroponic grow tower](https://extension.okstate.edu/fact-sheets/building-a-vertical-hydroponic-tower.html). In the setup, a pump would turn on every 10 minutes for 10 minutes, carrying water to the top of the system, and letting it drip on and drench the roots. Vertical systems like the one pictured don't require an additional air system, since the roots are constantly exposed to direct air. Another key advantage is space efficiency: whereas in typical systems the plants height is limited because of bushing tendencies, with a vertical system the space of my closet could be maximized by having multiple towers of the height of my closet. Instead of buying a kit this time, I made my own vertical system by drilling holes along a large PVC tube, and then placing smaller segments of tube within the holes. Unfortunately the product didn't work out, since my pump was so powerful as to propel water out and along the edges of the tube, wetting the outside of the central tower and fostering algae. Additionally, the tower itself was particularly difficult to keep upright, even amidst many ropes and wires, and since this setup involves water dripping down the central tube, it was extremely loud. It was disappointing, but I wasn't defeated. It was time for another method.

## Deep Water Culture

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

## Takeaways

The deep water culture system seemed to be the best route, yielding the greatest amount of basil while being extremely easy to maintain. I decided to keep up the system for a few years, slowly building off of prior years by improving the setup. With the same system, I'm going to be growing Shishito peppers this year, which are tasty, roastable/freezable peppers that are fast-growing. An update will be appended to this post when there's more progress on those. I've listed some of the other system improvements below, along with an image of the most recent setup.

## Recent Improvements

![Current setup](new_cording.webp|float=right)

* I've spraypainted the bins with a layer of opaque black, followed by two layers of white. This prevents light from seeping into the bins, and has significantly cut down on algae.
* To make it easier to manipulate the bins and access the airline, I've lined the floor with a cut up shower curtain for padding, and put the bins on dollies so that I can reposition them.
* Since the lights and air pumps get very hot during long hours of operation, I have installed a fan in the ceiling of the closet, along with two smaller fans on the walls, aimed at the plants and machinery. Since the fans use lots of electricity, they are set on timers to turn off an hour after the lights, and on when the lights turn on.
* I've upgraded my air stone system to new, larger disc airstones. In the past I'd avoided them, even though they provide a much steadier and higher quality flow of air, since I've had trouble with the suction cups sticking to the bottom of the tank. However, this time around I, by carefully wrapping them with aluminum wire, fastened ceramic magnets to the bottom, and then stuck magnets onto the bottom of the reservoirs.
* Instead of using twine, I now use para-cord and proper fasteners for my grow lights. It's much cleaner looking, and is a more durable, long-term solution.
