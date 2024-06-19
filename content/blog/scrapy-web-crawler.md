+++
title = "Creating and shipping a fast, user-friendly website crawler with Python, Scrapy, Gooey and PyInstaller"
date = 2024-05-21
updated = 2024-06-18
description = "In this blog post, a website crawler is made using Scrapy complete with a multi-platform installer and GUI."

[taxonomies]
tags = ["python", "web-scraping", "web-crawling"]

[extra]
toc = true
quick_navigation_buttons = true
+++


# Intro

> Did you automate a process at your job with Python and want to share it with coworkers? 
> Or maybe, you just made a cool program and want to share it with someone you know?
> Here is a way to share it with others who aren't tech savvy and aren't expected to install Python. 

This is a tutorial for Python programmers. In this tutorial, we will walk through a quick solution for making a Python program easier-to-share and more user-friendly.

As an example, I turn a [Scrapy](https://github.com/scrapy/scrapy) Python script into a user-friendly GUI program. But, the approach described here can be used really for any Python program.

This solution came from a [Stack Overflow answer](https://stackoverflow.com/questions/51213515/pyinstaller-error-on-scrapy/51236394#51236394) I wrote years ago while working on a project for a company.



# Tutorial

In this tutorial, we will be leveraging these projects:

- [Scrapy](https://github.com/scrapy/scrapy)
- [Gooey](https://github.com/chriskiehl/Gooey)
- [PyInstaller](https://github.com/pyinstaller/pyinstaller)

Let's jump in.



## Writing a basic Python web crawler with Scrapy



## Creating arguments with `argparse`



## Setting up a GUI with Gooey



## Freezing your application with PyInstaller





# Going Further

Considering we started with a single Python script file, this solution is pretty good: it has a GUI, it can be built multi-platform, and it can be shared via a single executable.

But, here are some valid questions to ask:

- What if you wanted to update the program remotely? Right now, every time you update the program, you need to rebuild it and re-share it with people. Consider devising a way to push updates remotely.

- PyInstaller can sometimes be a pain in that it is flagged by Windows Security. Consider using alternative packaging tool like [BeeWare Briefcase](https://github.com/beeware/briefcase).

- Is your little program gaining popularity? Consider writing your program to leverage more popular tools like Flutter. Or, consider going as far as to develop a native application. Python is a great, high-level language used primarily for automation, data science, and scripting. But, it is atypical for GUI applications. There is a right tool for every job. So, use the right tools.


---

Thanks for reading.

Did this blog post help you? Consider buying me a coffee. ☕







