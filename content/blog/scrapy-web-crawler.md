+++
title = "Creating and shipping a fast, user-friendly website crawler with Python, Scrapy, Gooey and PyInstaller"
date = 2024-05-21
updated = 2024-06-18
description = "In this blog post, a website crawler is made using Scrapy complete with a multi-platform installer and GUI."

[taxonomies]
tags = ["python", "web-scraping", "tutorial"]

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

If you already have a Python program in mind or you are not interested in creating a web crawler, **skip this section**. 

Scrapy is a web scraping framework for Python. We will be using it to create a minimal web crawler. We will mostly be folling the [Scrapy tutorial](https://docs.scrapy.org/en/latest/intro/tutorial.html).

First, install Scrapy:

```
pip install scrapy
```

Next, create a new Scrapy project:

```
scrapy startproject example
```

This creates a new directory called `example` with the following structure:

```
example/
    scrapy.cfg
    example/
        __init__.py
        items.py
        middlewares.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
```
This is because Scrapy is a project-based framework. The `example` directory is the project directory. The `example` directory inside the project directory is the actual Python package. The `spiders` directory is where we will put our spiders.

Now, create a new spider called `spider` with the following commands:

```
cd example
scrapy genspider spider example.com
```

Edit the spider file, which is located at `example/example/spiders/spider.py`. Here is the default code generate for the spider:

```python
import scrapy

class SpiderSpider(scrapy.Spider):
    name = 'spider'
    start_domains = ['example.com']
    start_urls = ['http://example.com']

    def parse(self, response):
        pass
```

Instead, we are going to make the spider a little more interesting. The spider will scrape the links on the front page of Hacker News.

```python
import scrapy

class SpiderSpider(scrapy.Spider):
    name = 'spider'
    start_domains = ['news.ycombinator.com']
    start_urls = ['https://news.ycombinator.com/news']

    def parse(self, response):
        for link in response.css('.titleline > a'):
            yield {
                'title': link.css('::text').get(),
                'url': link.css('::attr(href)').get()
            }
```

NOTE: The `yield` keyword is used to return a generator. In this case, we are returning a dictionary with the title and URL of the link. This is how Scrapy works. It is an asynchronous framework that uses generators to return data.

Now, let's test the spider:

```
scrapy crawl spider
```

In addition to other output, this will output the first 5 links on the front page of Hacker News. Like so:

```
2024-06-19 20:16:58 [scrapy.core.scraper] DEBUG: Scraped from <200 https://news.ycombinator.com/news>
{'title': 'X debut 40 years ago (1984)', 'url': 'https://www.talisman.org/x-debut.shtml'}
2024-06-19 20:16:58 [scrapy.core.scraper] DEBUG: Scraped from <200 https://news.ycombinator.com/news>
{'title': 'The return of pneumatic tubes', 'url': 'https://www.technologyreview.com/2024/06/19/1093446/pneumatic-tubes-hospitals/'}
2024-06-19 20:16:58 [scrapy.core.scraper] DEBUG: Scraped from <200 https://news.ycombinator.com/news>
{'title': 'Agricultural drones are transforming rice farming in the Mekong River delta', 'url': 'https://hakaimagazine.com/videos-visuals/rice-farming-gets-an-ai-upgrade/'}
2024-06-19 20:16:58 [scrapy.core.scraper] DEBUG: Scraped from <200 https://news.ycombinator.com/news>
{'title': 'Vannevar Bush Engineered the 20th Century', 'url': 'https://spectrum.ieee.org/vannevar-bush'}
2024-06-19 20:16:58 [scrapy.core.scraper] DEBUG: Scraped from <200 https://news.ycombinator.com/news>
{'title': 'Zep AI (YC W24) is hiring back end engineers to build LLM long-term memory', 'url': 'https://www.ycombinator.com/companies/zep-ai/jobs/J5TD9KW-backend-engineer'}
```

Now, we will have the spider save the output to a JSON file. While you could manually write code to save the output to a file, Scrapy has a built-in feature to save the output to a file. In the `settings.py` file, add the following lines at the bottom:

```python
FEEDS={
    'items.json': {
        'format': 'json',
        'overwrite': True,
        'item_classes': ['example.items.HackerNewsItem'],
        'item_export_kwargs': {
            'export_empty_fields': True,
        }
    }
}
```

Next, we have to create the item class. In the `items.py` file, add the following code:

```python
import scrapy

class HackerNewsItem(scrapy.Item):
    title = scrapy.Field()
    url = scrapy.Field()
```

Finally, we have to modify the spider to use the item class. Adjust the `spider.py` file to look like this:

```python
import scrapy
from example.items import HackerNewsItem

class SpiderSpider(scrapy.Spider):
    name = 'spider'
    start_domains = ['news.ycombinator.com']
    start_urls = ['https://news.ycombinator.com/news']

    def parse(self, response):
        for link in response.css('.titleline > a'):
            item = HackerNewsItem()
            item['title'] = link.css('::text').get()
            item['url'] = link.css('::attr(href)').get()
            yield item
```

Now, when you run the spider, it will save the output to a JSON file called `items.json` in the project directory.

So, run the spider:

```
scrapy crawl spider
```

And the output will be saved to `items.json`, which will look like this:

```json
[
{"title": ["Agricultural drones are transforming rice farming in the Mekong River delta"], "url": "https://hakaimagazine.com/videos-visuals/rice-farming-gets-an-ai-upgrade/"},
{"title": ["1/25-scale Cray C90 wristwatch"], "url": "http://www.chrisfenton.com/1-25-scale-cray-c90-wristwatch/"},
{"title": ["Carabiner Collection"], "url": "https://www.carabinercollection.com/"},
{"title": ["EasyOS: An experimental Linux distribution"], "url": "https://easyos.org/"},
{"title": ["The short, happy reign of CD-ROM"], "url": "https://www.fastcompany.com/91128052/history-of-cd-roms-encarta-myst"},
{"title": ["OSRD: Open-Source Railway Designer"], "url": "https://osrd.fr/en/"},
{"title": ["The Vulture and the Little Girl"], "url": "https://en.wikipedia.org/wiki/The_Vulture_and_the_Little_Girl"},
{"title": ["Brain circuit scores identify clinically distinct biotypes in depression/anxiety"], "url": "https://www.nature.com/articles/s41591-024-03057-9"}
]
```

We now have a basic web crawler. In the next section, we will make will add arguments to the spider with `argparse`.

This is a necessary step because we will be creating a quick GUI with Gooey. Gooey uses `argparse` arguments to create fields in the GUI application. So, we need to have arguments in place before we can create the GUI.



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







