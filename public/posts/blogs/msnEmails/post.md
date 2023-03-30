# Inspiration

![Allowed email domains \(2023\)](2023_email_creation.webp|width=16)

It was an abrupt idea, and an exciting thrill. I hit upon potential: a blog post online offering to create/sell @msn.com Microsoft accounts for $35 each. Microsoft has gone through various versions of its email service (currently known as outlook). And, while in past users have been able to create email accounts under Microsoft's @live.com @passport.com and @msn.com domains, currently, you can only create ones ending in @outlook.com and @hotmail.com. But, if someone else had discovered a method to create @msns, why couldn't I? So, I got to work, scouring Google for more information about the history of the domain. It wasn't long before I struck success.

## MSN Network

![Welcome screen](msn_premium_welcome.webp|float=left)

As it turns out, MSN stands for Microsoft network, the collection of eclectic Windows applications released in 1995. Various network services were offered for a low monthly rate, and users could connect to their servers through a Dial-Up connection. Around that time Microsoft released @msn.com email addresses for subscribers, which they later discontinued after acquisition of Hotmail. Nevertheless, their program [Msn Premium](https://www.microsoft.com/en-us/p/msn-premium/CFQ7TTC0KGVF) still exists, and is currently $9 a month, with the ability to get a full refund before month end.

### MSN Explorer

![MSN Premium \(2023\)](msn_explorer.webp|width=32)
![Install wizard](install_wizard.webp)

Carefully reading through the product's description, things started looking promising: they offer "computer wide security software, advanced phishing filter technology, pop-up guard" and, most importantly, "**multiple e-mail accounts**." But, what domain of email?, one may ask. So, I eagerly purchased a month subscription, fully intending to cancel right after exploration. And yes, after installing the program (with a pleasant built-in installer soundtrack), and being greeted by a friendly, informative, archaic welcome screen (they have tab based browsing now!), I found what I was looking for. In the Email section of the app, under the family section, I found what I was looking for. An ancient form to create "@msn.com" emails.

# My first @msn

![My first @msn email](caffeinate_creation.webp|width=28)

The form was a straightforward, requiring me to enter the desired email, along with some additional information, such as birthdate, location, and name. Interestingly, there was a "security question" field: a long-removed layer of security that has since been replaced with two-factor authentication and email/sms verification. Once I reached the end of the form, unlike the light grey TOS checkboxes of the present day, I was required to type in my full name to proceed. And then, it was there! A new email address had been created. After a quick login on Microsoft's normal log in page, I indeed had created a brand new, 2023 @msn.com email.

### Extracting the form

After more carefully inspecting the user flow, it occurred to me how truly insecure the process was: the process lacked a captcha or verification of any kind; it was a simple PHP form. So, what's to stop someone determined like me from creating a script to automate the process, and generate thousands of accounts automatically? Apparently nothing, so I did just that. I carefully inspected the form, looking for ways to extract the endpoint of the form requests. Something that I noticed in was that, for the brief loading gaps between pages of the form a link flashed at the top of the email creation widget. So, with a timely screenshot I was able to extract the link, and with a long night of scouring and reverse engineering network requests, I was able to write a script to reverse the process. And it worked. And I loaded up a json with 1k accounts.

### Reporting the exploit

This was my first time discovering a website vulnerability, so I wasn't quite sure how to proceed. I knew something had to be done, because it was evident that if anyone else with more computational and network power than I were to come along they'd be able to create hundreds of thousands of accounts automatically, which they could use for anything from spamming to scamming. So, after a quick Google, I came across the [Microsoft Security Response Center](https://msrc.microsoft.com/) vulnerability report form, and wrote up a report. Within a few months Microsoft reproduced and resolved the issue by adding a simple captcha to the form, which is still in place to this day.

## The names

![covid@msn.com](covid_msn.webp)

One thing I quickly learned through this process was how truly archaic @msn.com email addresses really are. I quickly realized that, as an inevitable result of there being no longer easily available is that there existed many unclaimed emails with modern English words/topics. I began claiming emails like "covid@msn.com," "airpod@msn.com," "JoeBiden@msn.com," "technophile@msn.com," "ethereum@msn.com," "spotify@msn.com," and more. Since I was, at the time, waiting for the captcha bypass vulnerability to get patched, I had some fun coding a script to automatically claim all untaken Pokemon @msn.com's, and a few three-character ones. I also figured out that one easy and effective way to check if an @msn.com email exists is to simply use the default account recovery form, wherein it only provides you a continue-confirmation if the account exists, and tells you that the account doesn't exist (and thus can be taken) otherwise. 

# Make your own @msn email

## As of recently...

![Email creation page](make_email.webp|width=32)

As is stands now, @msn.com emails are still acquirable through the method outlined above, but because of my report to MSRC there is now a captcha in place. I imagine that as long as MSN Premium remains available, @msn emails will remain available with it. Since Microsoft has a reputation for supporting antiquated projects for long amounts of time, I anticipate that this technique will work for a long time to come.


## The steps
At this point, I feel it best to include an explicit list of steps to go about creating your own msn email. I've listed them below, and if you have any questions feel free to email me for more details.

1) Go to the [msn premium purchase page](http://www.microsoft.com/en-us/p/msn-premium/CFQ7TTC0KGVF) and purchase 1 month of msn premium (~$10). As noted previously, you'll be able to cancel this later for a full refund.

1) Visit [membercenter.msn.com/signin.aspx](http://membercenter.msn.com/signin.aspx), the member center sign in page on their website.

1) Click "Sign In," and sign in with the same Microsoft you just purchased msn premium on.

1) Visit [texreg2.msn.com/wbum/Selector.aspx](http://texreg2.msn.com/wbum/Selector.aspx). This is the specific link that is embedded into Msn Explorer, and lets you add emails.

1) Click "Add a member," and fill out the form that follows. The information is arbitrary, but make sure to save everything. After that, click next. You will have to complete a captcha as part of this process. Note that clicking enter after filling out the captcha box will reset it, so you need to manually click on the submit button.

1) Enter the same name you entered prior in the name signature box and then click "Accept." If a few seconds later it says "You have successfully added \<email> to your membership" everything was done correctly.

1) Go to login.live.com and sign in to the account as normal.

1) Enter the new email you created for the email and click "Next."

1) Welcome to your new @msn.com email!
