+++
title = "A Guide to Making Dark Mode Emails in 2024"
date = 2024-06-03
updated = 2024-08-11
description = "Getting emails to look great is hard. This blog post details the technical setup of creating dark mode friendly emails with modern methods in 2024."

[taxonomies]
tags = ["email", "dark-mode", "email-marketing"]

[extra]
toc = true
quick_navigation_buttons = true
+++


# Intro

Love them or hate them: HTML emails are part of every inbox. Odds are you have a few unread emails in your inbox right now from businesses or services you've signed up for.

Coding emails is not like coding a website. It's a whole different beast. It feels like programming in the 90s: it's just old and outdated. You have to use tables for layout, inline styles, and you can't use modern CSS features like Flexbox or Grid. And support for web technologies in emails is not only limited, but it is also inconsistent: what works in one email client like Gmail might not work in another. Heck, old versions of Outlook don't even use a web engine to render emails; they use Microsoft Word! See [Can I Email](https://www.caniemail.com) for more. 

Crafting high-quality emails seems to be the bane of every developer. The situation is even more complicated when you consider dark mode. Dark mode is a feature that has caught on in recent years. It seems the world is tired of blue light zapping our retinas and wants something a little easier on the eyes. The rise of dark mode is so popular that as much as [25% of email users now have dark mode enabled](https://www.litmus.com/blog/email-client-market-share-may-2022). 

But, dark mode sucks when it comes it email design. It can make your emails look terrible. Many mobile email clients use the system preference of 'dar mode enabled' to automatically alter the colors used in emails in ways that are just not good nor accessible. This long-running issue thread on Github paints a picture of the [challenges of dark mode in emails](https://github.com/hteumeuleu/email-bugs/issues/68)

Coding emails shouldn't be hard. And, all developers shouldn't have to deep dive into the messy wasteland of email coding quirks and dark mode issues. So, this blog post details a minimally viable system for creating consistently good emails, dark mode or dammned. 

# Tutorial

## Why this approach?

This tutorial takes an opinionated approach to creating bulletproof emails. Like support for other web technologies, support for dark mode CSS in emails is inconsistent: not even the `@media (prefers-color-scheme:dark)` media query widely supported, with [only about 46% of email clients supporting it](https://www.caniemail.com/features/css-at-media-prefers-color-scheme/).

Coding emails is such a headache. Even modern drag-and-drop email builders that claim to 'support' dark mode tend to fall short. Being someone who has had to use these tools from big names like Braze, Mailchimp, and Hubspot, I can tell you that they are far from perfect. Opening up emails made by these tools in testing tools like Litmus or Email on Acid show that they are not as dark mode friendly as they claim to be.

So, I say screw it. Let's make a system that works -- regardless of the email client, regardless of dark mode. We will make a drag-and-drop email builder that enforces one 'light mode' design and uses a slew of hacks to make it work everywhere.

Not what you had it mind? If you want a list of other email tools, check out [https://emailresourc.es/](https://emailresourc.es/), which has a great list of email tools and resources curate by the folks over at [Parcel.io](https://parcel.io/).

## We will use:

- [MJML](https://mjml.io/): A markup language that makes coding emails easier. It's like Bootstrap for emails.
- [Cerberus](https://github.com/emailmonday/Cerberus): A set of responsive email patterns that work in every client.
- [Sendune](https://github.com/SendWithSES/Drag-and-Drop-Email-Designer): An open-source drag-and-drop email builder UI.

