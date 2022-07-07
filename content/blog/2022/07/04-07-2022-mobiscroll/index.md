---
title: "UI Calendars & Mobiscroll"
date: 2022-07-04T10:00:00+00:00
image: images/blog/webdev_header.png
author: David Gee
description: "The Challenges of UI Calendars"
signoff: Dave
mermaid: false
categories: 
- Mobiscroll
- React
tags:
- Mobiscroll
- React
---

This blog post is a story of building a web app and choosing [Mobiscroll.com](https://demo.mobiscroll.com/react) for their React calendar component. I started off naively thinking I could build it and given enough time, I could, but given the cost of Mobiscroll and considering you also get support, my time is better off spent elsewhere. It was a great choice, and the post below is a longer version of this summary. 

I've got to a point where I genuinely enjoy UI and UX and it's nice to share this story. There is a whole community of builders and creators that emit contagious kindness and energy. Thanks to everyone I've spoken to so far!

## Building Things

If you spend enough time building things, you will invariably get to a point where speed, support and *not my pain* is important. If the area of pain is one that isn’t your primary skill set, this becomes especially true. For me, JavaScript and React is that pain area. From mid-2020, I’ve taken time to learn technologies like React and Typescript. I can now build reasonable looking user interfaces that are stable and usable. That doesn’t mean I can build nice components like calendars, agendas, or time-pickers. Building custom web controls is a whole career’s worth of skill I do not have.

2019 was a huge year for some obvious reasons, but also the birth of my son. My wife in a surprise move, decided to retrain and not go back to her original line of work and became a beauty therapist. Early 2021, we created a beauty salon from the ground up. By mid-2021, she opened and had paying customers. This effort is a family endeavour and I spent evening hours and weekends building the salon and helping prepare her launch. 


{{< img50 src="bella1.jpg" alt="before">}} 

{{< img50 src="bella2.jpg" alt="after">}} 

The before's and after are pretty impressive. The room has intelligent lighting, guest WiFi and utility connectivity for her payment terminal. In addition, there is CCTV so she can see who's about to arrive! 

It wasn’t long before she came across data issues, like storing confidential customer information, managing appointments, and making sure she was working within her insurance boundaries. The sheer amount of paperwork generated per customer was insane and it was organised in a FIFO cache (i.e., she threw it in a securely stored pile). One weekend late in 2021, we started to evaluate the various CRM and booking software offerings and thanks to my career, I couldn’t cope with the poor quality and enterprise grade sales teams using ransom grade tactics to force the generation of revenue. The line was drawn and my newly found React and JavaScript skills were about to be forcefully tested and upgraded.

My wife’s application needs span normal and boring, to non-trivial state-machine based data capture. The more I worked on this web app, my understanding of the problem space developed, and I changed direction numerous times on topics like data structures and added my own features to the list like formal data validation and verification of important data like contact phones and email addresses. 

In anything like this, difficult things are always left until last, and I made a mentally fatal mistake. The issue was how to solve calendar semantics. The data structures and database access patterns I’d solved some time back were holding up all the way through development. I can mainly attribute thanks to Rick Houlihan for that and his insightful work around single table database design. The UI however was still a thorn in my side. Lots of commercially available React admin templates come with calendar components but I had a huge list of calendar-based needs! Calendars are generally based on corporate usage, with features like day appointments which sit in the header of the calendar and desktop widespread views. Getting a calendar component to bend to my will was going to be a challenge and I knew it.

- React friendly (functional not class based)
- Dynamic data loading based on the view
- Responsive design with a focus on mobile first
- Month, week, and day views
- Drag based entry creation and modification of appointments
- Dynamic loading of data depending on views (use of Redux to reduce API calls)
- Blocking time for unavailable slots
- Setting working hours
- Mobile friendly modes, specifically for iOS style styling and behaviours
- Easy to manipulate time-zones and allowance for daylight savings
- Friendly towards `momentJS` and `ISO8601` timestamps

On the DIY journey, I got as far as having a monthly view and started working on daily agendas views. Time is always dealt with in UTC and converted at the presentation layer (thanks to the browser’s stored time-zone), but I started to burn all of my available hours on just the calendar component. It’s not like I have many hours spare anyway (two a day perhaps?) and this became a real burden. As part of a normal development sprint, I changed the way the event data was structured and broke my calendar component. I did an npm upgrade and broke the calendar component. I'll stop there, but you get it. The calendar became the most important, central and fragile component. I gave up out of frustration and started to re-evaluate the offerings available for my wife to use. At that point in time, I only have some six months of experience with React and modern ES6 JavaScript. My core and primary software skill is in distributed communication and back-end low-level. Sure, twenty years ago I could write PHP, but I wasn't going back there, so considered my UI skills as non-existent. At the same time my wife was asking almost constantly when she could use the app. Q1 2022 came along and I was determined to solve this once and for all, having slumped (*...stopped*) a bit in late 2021.

With some experience in React and ES6, I re-evaluated React templates available (which had sensible prices). One stood out called [Vuexy from PixInvent](https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/apps/calendar). The calendar component was nice and satisfied some of my requirements list. The event form would need some work, but it was workable.

{{< img src="vuexy.png" alt="vuexy" >}}
<br/>
<br/>
My wife’s pain from not using software to do her admin work was building and I even had friends asking me when this thing was getting done for her. One of the primary issues was all of the forms and components I’d created for MK1 of her app were now trashed and I had started the front-end work again with Vuexy. The backend was ready to go however which made it less painful but the pressure was building. 

Without realising it, I had committed a most heinous crime. Good enough was sacrificed in the name of aiming for perfection, a mortal enemy of getting an MVP out the door. So, one weekend in May 2022, I retrieved MK1 from the trash pile, mended some time drift issues (I had changed the authentication to [Magic Link](https://magic.link) from [Auth0](https://auth0.com)) and got the components working again. The MVP was pushed to a CDN and the modular monolith API was launched as a systemd service on a low-cost EC2 instance. The next day, she was onboarding customers on to the CRM aspect of the app and doing things like adding patch test records, in which a customer must sign off (legally) on the therapist using a chemical that will be used like a dye.

The CRM aspect of the app and patient record system worked well, and her customer count was increasingly rapidly, as was the almost daily feedback from using the web app. She was using the data validation system with good results, and we made a number of UX improvements. Occasionally she would get randomly logged out of the app, which was down to a local storage and third-party cookies. It got a little frustrating as every now and then records that should have been saved, just vanished. After some debugging I weighed up the challenges and reverted the authentication system back to Auth0 from Magic and the issues were resolved. Yes, I could use Cognito and could have put more time and effort into Magic, but as a reminder, this isn’t a full-time job, it’s a weekend project at best and learning something new would eat into the development time available and add to the already palpable tension.

## The Damn Calendar

Back to the root of all evil, the calendaring. Pushing the MVP out for my wife to use had been a huge leap forward and having almost daily feedback was just magic. Could I solve this quickly without the pain of burning through leisure time? Like all things software, problems can be solved with enough money. She was willing to pay several hundred pounds a year for this from a commercial software house, so could we use the same available money to buy components without blowing the budget? So far, her custom app was doing exactly what she needed without any hard sales tactics or weird quotas. Many of the commercial offerings snare you with low cost to entry then smack you in the face with features that require plan upgrades. We figured the answer had to be yes to buying licenses for solid components and explored the options.

In trying to avoid writing a bake-off style blog post, I want to focus on Mobiscroll. I did some homework and read up on [iCalendar](https://icalendar.org/), [Mobiscroll](https://mobiscroll.com), [SyncFusion.com](https://syncfusion.com) and [Vuexy](https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/apps/calendar). Mobiscroll’s list of capabilities was uncannily aligned with my requirements list and so I opted to kick the tyres. Furthermore, testing it followed product-led-growth principles, which meant I could test my scenarios without getting into a glove slapping duel with a sales team. 

{{< img src="mobi1.png" alt="mobi1" >}}
<br/>
<br/>
Even their design led web presence was nothing short of inspiring. Each Mobiscroll web page has working examples with copy-pasta code. Pure excitement at this point! Was it too good to be true? Even the workflow to get working code from a UX perspective is impressive.

{{< img src="mobiscroll.gif" alt="mobi1" >}}
<br/>
<br/>
One weekend in early June 2022, I installed Mobiscroll’s dependencies and created an Agenda component for the dashboard page of the app. They had even thought about navigational buttons for changing views. Here is a screen shot from my app that allows you to change between week agenda view and day view agenda. Out of the box, it just works.

{{< img src="bkng1.png" alt="bkng1" >}}
<br/>
<br/>
{{< img35 src="bkng2.png" alt="bkng2">}} 
My experience with React so far has been no different to anything else in so much as you hack your way through integration looking for methods and properties that components expose. This is not the case with Mobiscroll. Their doc pages are incredibly detailed and there is even a testing widget on their doc pages which shows you what events fire when using the controls. This was game changing and the first time I’ve come across anything so damn useful. That page is [here](https://demo.mobiscroll.com/react/eventcalendar/event-hooks#).

Having got the basics working, I pondered how quickly I could build an appointment form to add events to the calendar. Blisteringly quick it turns out. Mobiscroll had done all the hard work for me. Here’s my specific example of that form below with the addition of a couple of extra sliding switches and fields. This form generates a uniform event which is added to the calendar and vice-versa, the details can be pulled from the calendar and populated on to the form. As for time-zones, all of Mobiscroll’s components give you multiple options and for me to say it just works, is a huge relief. 

So many possibilities have opened up in front of me thanks to Mobiscroll’s capabilities. Anything my wife asks for, I can find easy ways of doing it. Want to block out dates? Not a problem. Want all day events? Easy. Need multiple people on the calendar? Just a feature. 

## Warts?
Initially I was storing my events in Redux, which meant the dashboard view and booking views shared the same data source. This worked perfectly for day and week view, but month views were broken. Mobiscroll adds properties to the month entries and Redux doesn’t allow you to do this without having a suitable reducer exposed. I provided a copy of the Redux data to the Mobiscroll component and problem solved. They have an open bug against this issue and their support was blisteringly fast in helping me out when I raised a trouble ticket. Another issue I had was styling one of the components which does segmented controls. Their support team came back with a temporary work around and confirmation of adding a feature request for my styling need. I’m now in a strange position of having the comfort of a friendly and helpful support team behind the most critical component in my wife’s app.  For a pet project this is just magic. It’s worth stressing that what Mobiscroll does is complex and with a huge surface area. Bugs, issues, and feature gaps are natural bed fellows for anything complex and complicated. The grown-up thing to do is talk with support and I’ve done this several times now, receiving friendly and helpful responses.

When I converted to a licensed Mobiscroll version from the trial, my build pipeline had cached the trial npm package. That meant even with a license key and npm login, the build artifact had 'trial' plastered all over it. The build pipeline is on AWS Amplify and the build engine caches npm packages. Be sure to refresh the cache by removing the package and re-adding it on a single pass through of the build. For me, this meant changing my `amplify.yml` file to include the commands to remove the packages, then a reversion without those commands. The package names are the same and the cache didn't see any difference when I upgraded which would have forced it to refresh the cache. That wasn't Mobiscroll's issue but it's worth a mention just in case you come across something similar.

## TL;DR
Customer data handling and time-based bookings are now things I have significant skill with in both front-end and back-end. Furthermore, thanks to a good engineering approach to the data structures, the cost of running this application has a known cost per customer onboarded and bookings made. I’ve aligned with AWS serverless technology where possible and fixed costs come in the form of a single EC2 instance that’s entirely CI driven. If it blows up, not an issue, I just re-run the CI pipeline. The outcome is each of her customers now carries an admin cost overhead which makes my wife’s life easier. There are lots of features to be added, including a point-of-sale component, which will in essence, do most of her accounting, saving even more time to maximise personal time.

For Mobiscroll specifically, there are the normal gripes from developers on the forums about lack of responses, but support has been fantastic for me so far. Every company has its fair share of whines and complaints and I’d question the honesty of Mobiscroll if I didn’t see some honesty warts. The team genuinely seem to care and the help they’ve provided has been surprisingly good.

There were lots of things I could have done for this calendar component including gritted my teeth and got it working. Just to stress fpr the last time, I am not a professional JavaScript developer, and this project is for my wife’s business. Every hour spent on this is an hour I'm not doing something leisure based like reading a book or walking the dog.

Mobiscroll in addition to calendars, provide nice form controls, and I've become more reliant on their offerings as a result of this experience. Please use my referral link right here if you read this post and found it useful. I’m now a happily paying customer and would absolutely buy again. 

My referral link: [https://mobiscroll.com/r/6861ea75](https://mobiscroll.com/r/6861ea75)

As for the web app’s future, it turns out lots of people need the same functionality and I’ll be launching it for hairdressers, beauticians, and barbers in the not-too-distant future. Operationally, it’s very light and I already have ops capabilities in place thanks to some previous effort with [Grafana labs, Loki, and Prometheus](https://dave.dev/blog/2022/05/24-05-2022-cloud-ops/). There will be other posts on the web app itself, but I've built it to be self-sufficient and almost near zero maintenence.