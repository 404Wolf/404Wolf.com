# Inspiration

It began with a realization. Previously, Minecraft had been to me, much like it is to the rest of the world, a videogame. I had done some tinkering with datapacks, improved my ability to arithmetically conceptualize problems with redstone, and contrived some unique art with WorldEdit, but none of my prior experience was anything like what was to come. My first encounter with the realm: NameMc.

## NameMC

The first stage of the journey was discovery of the Minecraft-specific social media company [NameMc](https://namemc.com). Essentially, a website dedicated to indexing all Minecraft accounts, and then producing profiles wherein you could link socials and place art. But, one page caught my eye above the rest: [the minecraft names droptime table](https://namemc.com/minecraft-names). The compilation of usernames soon to be available for claiming immediately piqued my interest. Wouldn't it be just so cool to own the account with the username "adult," perhaps (one of the first real-word names I saw was 'dropping'). So, instinctively, I got myself situated at my desk, logged into my account's settings page, entered the name, and carefully hovered my cursor over the "Change Your Username" button. But, as it turned out, my single hopeful click, also known as "hand sniping," was no match for the storm of thousands of automated 'sniper' requests that I would soon learn about on my adventure through the discords of the industry. But when I learned that the account had sold for thousands of dollars, I was determined. In a community of mostly teens like me, I knew that with fervent learning, eager adaption, and a reasonable investment, I could carve out my own nook.

# Research phase

As usual, my adventure into the world of username sniping began with extensive research. As it turned out, there were already many open source public autoclaimers (also known as username 'snipers') out there to tinker with, and the first that I tried my hands on was [McSniperPy](https://github.com/MCsniperPY/MCsniperPY), a popular choice written in Python. As I continued my research into the community, I began discovering a large, disparate network of communities all interested in username trading and sniping. I also came across [the fascinating youtuber Xinabox](https://www.youtube.com/user/XinaboxGaming), along with a few others, who produce content specifically on the "og minecraft community" (a catch-all term for those interested in valuable accounts).

## Getting started

![Log of name-change requests](requests.webp|width=15)

But, I wasn't ready to settle for a popular open source sniper, and was sure I could do better. After weeks of learning about network requests for the first time, utilizing async Python and multithreading, and the actual endpoints of Mojang, I was beginning to get a better grasp of what I'd need to do. Names release a few milliseconds early, so I'd need to extensively experiment. Each account was allotted 3 name-change-requests a minute, so I'd need many accounts. And, same-IP-requests led to processing gaps, so I'd need many servers. In other words, an unexpectedly complex endeavor with a healthy blend of ingenuity and strategy. Username sniping turned out to be a game of efficiency, capacity, and capability. 

## The partnership

![Friend's skin art shop](friend_name_mc_art.webp|width=21|float=left)

It wasn't too long into my journey that I made my first friend in the community. His niche was particularly interesting: NameMc skin art. NameMc skin art, potentially the subject of a future post, takes advantage of NameMc's skin history display. NameMc displays a grid of your 27 most recent Minecraft account skins' faces (a Minecraft skin is the outward appearance of your avatar, which can be changed and set to be any low resolution pixel image). Skin art involves designing pixel art and then converting it to many skin files, and then placing each one on your account one at a time, as to build up a grid. My friend was offering to create the art and skin files as a service, which I found really fascinating. 

![Example skin art \(by me\)](my_skin_art.webp|width=25)

After further conferring with him, he told mem that he'd had some experience sniping usernames, and we began discussing some of his past experiences and successes. When things really took a turn was when he reached out to inform me that someone had offered him a substantial discount on bulk Minecraft accounts. He wanted me to go half in with him on 20 accounts, so that we could start a sniping organization. With such a large number of accounts, we'd have a much higher chance of winning names than the average person sniping usernames, so it seemed like a reasonable investment. And that's where it all began.

\(On an unrelated note, I've coded a tool to apply any NameMc art of your choosing to your profile, which can be found [here](https://github.com/404Wolf/AutoSkin)\)

# The beginning

We started out our organization by sniping lower 'tier' usernames, such as random 3 character long ones, using McSniperPy on a few [Vultr VPSes](https://www.vultr.com/) \(servers\). VPSes were needed because of Mojang limiting the number of username-change requests per minute per ip address, and, as an added bonus, multiple servers allowed for maximal concurrency and the lowest possible ping to Mojang. Through the process we were able to get a better grasp of offsets \(since names don't drop at the exact second of release, sending requests ever so slightly early was most advantageous\), and began to build a reputation and grow our Discord (where we would hold auctions for our 'snipes'). 

![First few sales](first_few_sales.webp)

We quickly realized, however, that while McSniperPy is great for first timers and people sniping with just a single account, it was unideal for larger sniping organizations. Most of the major competitors had custom, larger codebases, and we quickly realized that we'd need one too. To get us started, my friend was able to get a proprietary socket-request based Python sniper from an old buddy in the community, and we began using that. As we continued expanding, I integrated the ability to queue names with a discord bot, wherein a simple Flask API would create threads of the sniper on the servers. We continued progressing, and continually reinvested in accounts to boost our odds.

## Expansion

While co-managing our auctions and facilitating transactions, I spent significant time making our systems more scalable and efficient. For the first few stages I improved the discord bot interface, and then proceeded to add more advanced features to boost our odds. I made it so that we could set up a queue of many names, and have them automatically get 'sniped.' I added a channel in our main discord server that would announce successful snipes automatically, so that customers could start bidding right away. And, I added the ability to spread out the request offsets across our servers, so that we didn't have to bet on just a single droptime.

## The gamechanger

After a few weeks of obsessive coding and growing our operations, we were at the point where we were sniping many names a day with upwards of 15 VPSes running at all times, causing operational costs to spike to $70+ a month. Together, we came up with an ingenious solution. If the VPSes only required 10 minutes to authenticate all our accounts and send the name-change requests, then why'd we need to pay for 15 24/7 VPSes? Theoretically, I thought, we could just have one central VPS deploy \(create\) all the other VPSes 10 minutes before droptime, and automatically 'ship' the accounts and settings to them. It was an extensive, elaborate undertaking, and I didn't have much of an idea as to where to get started, but I knew that it was the best way forward.

## The system

(This post is still in progress, I'll be adding more soon!)