# Tasker
My submission for the PA High School Media and Design Fair 2019. A task management app that prioritizes for you. 

## How does it prioritize for me?
It takes information from you such as the task's due date, importance to you, and how long you think it will take and plugs it into a simple formula that yields a raw score of 0 to 4. The higher the score, the more important the task! I am currently iterating on this algorithm to account for things such as trends over time, categories, and other useful aspects. 

## Code Walkthrough
The code has four main focal points that developers will need to dive in.

`App.js` - the App's entry point, which defines all the assets and loads up the navigation view, as well as the Firebase connection.

`/data` folder - stores some data classes, which contain functions for processing Tasks and Dates.

`/screens` folder - stores the actual screens, which show the user interface to the user and populate it with data.

`/components` folder - reusable individual components for the screens

The `/screens` and `/components` folder are where you would go to edit the user interface, and `/data` is where you would edit the backend code. The language used is JavaScript; more specifically, ES5 (its 2015 version).
