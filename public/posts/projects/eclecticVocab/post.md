# TLDR

My eclectic, carefully curated deck of English vocab words that are both useful and mostly advanced/not very common. Many words are taken from Webster's words of the Day page, but lots are also from my readings/experiences too. All words are words that I did not originally know and that I believe are genuinely useful. I've made a custom, styled template for the deck, and have put together images and audio for each card!

![Desktop flashcard example \(front\)](desktop_flashcard_front.webp)
![Desktop flashcard example \(back\)](desktop_flashcard_back.webp)

# The deck

![The backlog](backlog.webp|width=40|float=right)

As I encounter new, unknown words, I've stored them away in a [Google Keep](https://keep.google.com/) backlog. I've gotten into the habit of allocating a corner of my loose leaf that I use for notes for vocab words that I don't yet know, and stay up to date with the [Merriam-Webster word of the day](https://www.merriam-webster.com/word-of-the-day). Since I don't want to commit completely useless words into my lexicon for no reason, I do some vetting, checking their usage over time, recent usage, and the applicability of the word, before batch adding words to my [spaced-repetition](https://en.wikipedia.org/wiki/Spaced_repetition) flashcard deck. 

## Spaced repetition

![Spaced repetition learning curve](spaced_repitition_graph.webp|float=right)

Spaced repetition is a special evidence-based flashcard studying method wherein cards are automatically shown to you at specific intervals based on your response to remembering the card, as to show you the card at the moment before you are predicted to forget it. That is, the more you forget a card, the more often you will encounter the card, and the better you get at remembering it, the longer the interval gaps become. The end result: the more you review, the longer it takes to forget. Not only is retention boosted, but study time is better optimized.

![Leitner box system](leitner_box_animation.gif|float=right)

Generally these days spaced repetition is implemented with software, but that does not necessarily need to be the case. ['Leitner boxes'](https://en.wikipedia.org/wiki/Leitner_system) are an implementation of spaced repetition with physical flashcards and boxes to store them in based on proficiency. After reviewing cards, the cards move to boxes based on your ability to recall them, and the easier to remember cards end up being reviewed less often. 

# Getting the deck 

![Anki Flashcards graph example](anki_graph_example.webp)
![Mobile flashcard example](mobile_flashcards.webp)

Although approaches like this do work, I highly recommend using software to manage the spaced repetition for you, since they can provide greater configurability, allow you to track your progress over time, and manage everything for you, so that you can spend your time actually reviewing cards rather than handling technicalities. There are a large variety of both free and paid applications for the task, but my go-to is [Anki Flashcards](https://apps.ankiweb.net/). It's completely open source, easy to use, highly configurable, extendable, and has lots of community support, decks, and add-ons. It's completely free to use their website, desktop app, and android app, but their iPhone app is $25 (and worth every penny).

A copy of the deck can be downloaded [here](https://drive.google.com/file/d/1wysbw8pV2i1xhy1Xwt3zRoyVMkC2zH5s/view?usp=share_link). I will try to frequently update the link with new cards as I add them, and Anki Flashcards should automatically merge in the new ones when you install updated decks.

# Automating Compilation

With my deck building up in size, and my appetite for words evergrowing, I knew I'd need a better way to create flashcards. For each flashcard, there are 9 different fields: word, definitions, examples, synonyms, notes, images, pronunciation, audio, and part of speech. All fields are needed for every card except notes, which is reserved for when an important note is needed to provide context for a word. While this may have been fine for the first 100 cards, I hope to grow at a much higher rate, and also thought that automatic card generation would be a fun next step. I'd still curate the words, but a bot would help create the cards.

The first step of figuring out how to automate would be to determine where and how to fetch card information. While indeed many dictionary APIs, including free options, already exist, such as [webster's](https://dictionaryapi.com/), I wanted something that would provide me unique examples for the word, and compile all the data in one place. Additionally, I needed to implement some sort of image generation/location system to find an image to help remember the word, along with adding text to speech so that my flashcard software could read me the word.

Over the past month, I've come to find that OpenAI's ChatGTP has been particularly useful for curating these specific things, and their DALLE image generator has been able to create good-enough images for memorizing words. Since they have extremely cheap and easy to use APIs for the services, and I've been wanting to learn how to implement NLP into software anyway, I chose to implement OpenAI's AI to generate word images and metadata. For text to speech, I chose Google text to speech, given it's robustness and popularity.

With ChatGTP's API, you have the option of providing a "system message" to the bot before querying it. For this, I wanted a bot that would both write poetically and in interesting/helpful ways, but also provide output in as a valid JSON. For this, I wrote up the following message to teach the bot how to behave and function.

```
You are a very skillful poet with a large lexicon. Your goal is to help people improve their vocab in a fun and helpful way. People will provide you a single word input, and you will reply with various pieces of information, separated by two newlines. Ensure it is a valid json. Follow the following template exactly. If the word appears misspelt, take your best guess as to what the word is. If you are totally unsure, respond "na".

{
    "word": {Word provided, or, if provided word misspelt, your best guess.},
    "part_of_speech": {Part of speech of the word.},
    "pronunciation": {The phonetic pronunciation of the word, using dashes as separators and only ascii characters. Aim for clarity.},
    "definitions": [<Definitions here, separated by commas, in order of popularity. Include the top definition, along with up to 3 other popular definitions as needed, but aim for as few as possible. Ensure each definition is clear and longer than 4 words. The word itself shouldn't show up in any of the definitions. Make them clear, but not overly textbooky.>],
    "synonyms": [<4-5 synonyms here, separated by commas, each embedded in quotes, in order of helpfulness. Synonyms should be only single words each, and they shouldn't be totally obscure.],
    "examples": [<4-5 examples here, separated by commas, each embedded in quotes, in order of popularity. Each example should not start with a proper noun, and the ending period should be left out (if it is multiple sentences only the last one should lack a period). For the specific requested word, embed it in single asterisks. The examples should be upbeat, make sense and sound eloquent and good, and help demonstrate the word definition. Ensure that they are fully lowercase, except proper nouns.>]
}

Additional important instructions:
1) If passed a conjugated verb, standardize it to be imperative.
2) If passed a declined noun, standardize it to be singular.
3) Be lively, friendly, clear, and as helpful as possible. Be slightly poetic and convivial.
```

Images also require a prompt, but for the image I chose a simpler prompt:
```
Detailed eccentric artistic and clear oil painting that showcases/represents {word}
```

The problem I encounter when I put `{word}` in quotes or ask for a depiction of the "word {word}" is that it will put the actual word in the image, whereas I want a visual depiction of what the word means. This specific prompt seems to ensure that, while often highly abstract, the images are always depictions that somewhat relate to the meaning of the word.

<div style="text-align: center; margin-top: .6em; margin-bottom: .6em; font-size: 24px">
Here's the final result...
</div>

!["Glower" DALLE image](glower_image.webp)
!["Obnubilate" DALLE image](obnubilate_image.webp)
!["Conflate" DALLE image](conflate_image.webp)

```json
{
    "word": "Conflate",
    "part_of_speech": "verb",
    "pronunciation": "kuhn-fleyt",
    "definitions": [
        "to bring together; meld or fuse",
        "to confuse or mix up"
    ],
    "synonyms": [
        "blend",
        "merge",
        "combine",
        "unify",
        "amalgamate"
    ],
    "examples": [
        "Let's *conflate* our ideas to create something truly original",
        "Don't *conflate* this issue with others that are irrelevant",
        "The author often *conflates* fact and fiction in his stories",
        "The sensation of nostalgia and longing were *conflated* in her heart"
    ]
}
```

I've made all the source code for this automatic image data generator available [on my Github](https://github.com/404Wolf/EclecticVocab/tree/master), here.
