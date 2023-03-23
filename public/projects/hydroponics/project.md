# The roots

## Starting off

![The Roots](roots.webp|width=25|float=left)

It was 2019, the summer before high school. Many projects were coming to a close, and schoolwork hadn't yet picked up. My vinyl wall Office-Quote sticker endeavor had completed; my 3d-printed avocado production had died down. My interest in tech was beginning, and I craved learning Arduino through a practical and applied way before high school. My closet had just freed up from my Kombucha brewing apparatus, and was ripe for project-iation. I wasn't ready to let it sit dormant, so I decided to transform the closet into an automated garden. The first decision: what to grow.

# Moldy Strawberries

![Strawberry Grow Tower](strawberry_tower.webp|width=30|float=right)

## Setup
The first phase of the closet garden was, in fact, not actually hydroponics. My research began by looking for fast growing, easily maintainable plants, and I settled on strawberries. I bought some seeds on ebay, and decided on a grow tower to maximize the area of my closet. If successful, there'd be room for many more towers, but I'd start with one. Meanwhile, I set up an Arduino system to automatically disperse water from a large bucket when the soil dried up, using a soil moisture sensor, and I covered the walls in mylar sheeting to maximize the light hitting the plants. I purchased relays, and cut an extension cord, putting the positive wire across the relay, so I could control the lights with my Arduino too. As time progressed, the Arduino didn't water often enough, or, when reconfigured, over-watered, leaking water, so I pivoted to timer-based-watering. For lighting, I settled on a sketchy, cheap Amazon grow light, which melted itself and set off my GFCI outlet. The replacement one I got was better, but still wasn't bright enough, and then the third choice worked well, though it heated up my closet to an ambient 85.  

## Success

![Strawberry Fruit](strawberries.webp|width=13|float=left)

Within a few weeks, most of the strawberries germinated, and the plants began thriving. They began branching out, and runners (baby plants attached to the mother plant) started shooting out. Within weeks, flowers appeared, and then the first few fruits. They were juicy, bright red, and perfect—until the mold started. I tried adding a dehumidifier, and bought Neem oil as a natural fungicide to protect the edibility of the fruit, but it was futile. After caving to synthetic fungicide, I rid the plants of fungus, and effectively made the plant ornamental for months to come. In the meantime, I began planning for the next season.

# Hydroponics

![The transition](strawberry_tubing.webp|float=right)
![Basil grow rack](basil_tower.webp|width=15|float=right)

## Assembled Grow Tower

For my first attempt, I decided to go with an Amazon [basil grow rack](https://www.amazon.com/gp/product/B0787F9LG7/), since it claimed to provide an all-in-one system that only required simple assembly. A bit weary of leakage, I carefully put it together, and put my basil into the included grow pods. For the first few weeks, while figuring out ideal nutrient ratios and water acidity, the basil began growing. However, I quickly ran into a roadblock: the small tubes were being jammed by the ever-growing basil plants' roots. The larger the plants got, the more unwieldy the system became, and the less water the plants received as a result of the jamming. Moreover, cleaning the system was virtually impossible without removing all the plants and disassembling the tubes. Unfortunately, I needed to change gears, but, on the brighter side, I did establish hydroponic basil as a plant with potential.

## Custom Vertical Tower

![Hydroponic vertical grow tower](hydroponic_grow_tower.webp|width=10|float=right)

The first idea for the overhaul was to build a vertical [hydroponic grow tower](https://extension.okstate.edu/fact-sheets/building-a-vertical-hydroponic-tower.html). In the setup, a pump would turn on every 10 minutes for 10 minutes, carrying water to the top of the system, and letting it drip on and drench the roots. Vertical systems like the one pictured on the right don't require an additional air system, since the roots are constantly exposed to direct air. Another key advantage is space efficiency: whereas in typical systems the plants height is limited because of bushing tendencies, with a vertical system the space of my closet could be maximized by having multiple towers of the height of my closet. I did go about making my own vertical system, but unfortunately it didn't work out for a few key reasons. Firstly, my pump was so powerful as to propel water out and along the edges of the tube, wetting the outside of the central tower and fostering algae. Secondly, the tower itself was particularly difficult to keep upright, even amidst many ropes and wires. And, thirdly, since this setup is   

## Deep Water Culture

![Deep water culture system](deepWaterCulture.webp|float=left)

### Setup

My first success: deep water culture (DWC) hydroponics. In DWC hydroponics, plant roots are suspended in a nutrient-rich water solution, with an airline system constantly pumping air into the water, allowing for maximum absorption of essential nutrients and minerals. The system is extremely simple, but requires managing large reservoirs of liquid—ensuring that they hover around the right acidity level, that there's the right fertilizer amount, and that they stay fungus-free. It's not an easy task, but it turned out to be much more feasible than any of my prior systems. 

![Grow baskets](grow_baskets.webp|float=right)

To start, I purchased [three large storage containers from Lowes](https://www.lowes.com/pd/Style-Selections-30-Gallon-120-Quart-Gray-Tote-with-Standard-Snap-Lid/1000183149). While food safety is obviously of importance, food grade bins are astronomically expensive, so I settled on these specific bins because of their food-safe plastic composition, even if they weren't technically rated food grade. My plan was to use a [super large 3" drill bit](https://www.amazon.com/gp/product/B07ZRVM7WM/) and some [3" grow baskets](https://www.amazon.com/dp/B08CGVL9FW) to hold the plants. The air pumps I used were initially small bubblers, but, the [r/hydroponics](https://reddit.com/r/hydroponics) rule of thumb seems to be 1 wat of air pumping power per liter of liquid, so I purchased [two commercial air pumps](https://www.amazon.com/gp/product/B078H92695/). Since they were extremely loud, I also threw in some [vibration dampening pads](https://www.amazon.com/gp/product/B0042U92TE/), which cut down on the sound a bit, and set up a dollar-store fan above them to prevent overheating.

### Progress

![Baby plants](baby_pepper.webp|width=16|float=right)
![Pruning basil](pruning_basil.webp|width=15|float=left)

The system was all set up, so now all that was left was to wait. The plants germinated flawlessly, and were quickly ready to be placed in pebble-stuffed grow cups. The tanks were full and fertilized, and the air pumps and lights' timers had been configured properly. The new DWC setup worked like magic, requiring extremely low maintenance and yielding extremely high loads of basil. As I quickly learned, basil **requires** meticulous pruning to maximize yield. By cutting between leaf stalks, I was able to get the plant to branch out into a bush, rather than the tall stalks I had in my older systems. With such great success, the harvests began rolling in. It was finally time to start producing pesto.

## Pesto Production

## Recent Improvements

![Current setup](new_cording.webp|width=25|float=right)

To date, I've continued using the deep water culture system, and I still use the same three bins. However, I've made some improvements to the old system:
* I've spraypainted the bins with a layer of opaque black, followed by two layers of white. This prevents light from seeping into the bins, and has significantly cut down on algae.
* To make it easier to manipulate the bins and access the airline, I've lined the floor with a cut up shower curtain for padding, and put the bins on dollies so that I can reposition them.
* Since the lights and air pumps get very hot during long hours of operation, I have installed a fan in the ceiling of the closet, along with two smaller fans on the walls, aimed at the plants and machinery. Since the fans use lots of electricity, they are set on timers to turn off an hour after the lights, and on when the lights turn on.
* I've upgraded my air stone system to new, larger disc airstones. In the past I'd avoided them, even though they provide a much steadier and higher quality flow of air, since I've had trouble with the suction cups sticking to the bottom of the tank. However, this time around I, by carefully wrapping them with aluminum wire, fastened ceramic magnets to the bottom, and then stuck magnets onto the bottom of the reservoirs.
* Instead of using twine, I now use para-cord and proper fasteners for my grow lights. It's much cleaner looking, and is a more durable, long-term solution.

# Kumquats and beyond

## Hydroponic Kumquats