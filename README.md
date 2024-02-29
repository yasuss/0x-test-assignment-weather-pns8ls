# 0+X Test Assignment: Weather App

In this assignment, you will complete a weather app that was started by another developer. Your tasks are to **add new features** and **improve the source code**.

The app so far is written in plain JavaScript. Set up **TypeScript** and finish the app using TS.

Please, make sure to **document** your solutions and reasons behind taken technical decisions in a Markdown file and attach it to the project.

Prepare and send us your solution as a **GitHub repository**. Use the existing code as the initial project state and create a **PR with all the changes** you're going to make.

### Architectural solutions

Architectural solutions which I decided to make:

- Splitted whole main screen into `widgets` - current weather, hourly forecast and daily forecast. So the code becomes more readable and reusable
- Moved helpers into `shared/lib` directory to make it more reusable
- Splitted main css file into small fragments and place thiese fragments near to components. So we don't have 1 big stylesheet with all styles

### Features

- Integrated [Weather api](https://www.weatherapi.com/)
- Updated the background based on the user's local time by getting current hour and adding className in main style file depends on the hour
- Created loader and used it on main screen

### Bug Fixes

- Add style param `overflow-x: auto` to “Hourly Forecast” section to make it scrollable
- Fix columns in “10-Day Forecast” section by using `grid` and `grid-template-columns: 1fr 1fr 1fr;` to fix position for columns
- Fix gradient rate in “10-Day Forecast” section. For calculating this rate, we calculated min and max tempreture in all days in function `getExtreme`, found the position for min and max tempreture for each day in function `getRange`, set these values as css variables (`--left` and `--right`) and use these css variables to place the line 

### Best Practices

Improved code by adding features:

- Made accessible svg by adding `title` and `desc` to make it readable for screen reader
- Splitted the code into chunkes for better scaling 
- Changed architecture
- Optimized styles. For example: in forecast classname use `gap` instead of `margin` for each elemnent; use just `.main` selector insted of nested selector `#root > .main`

## Performance

The lighthouse program was used to measure performance. The report is available in the repository []

## Additional Features

- Improve the current location detection feature by showing the current **city name** instead of “Current Location” when the app gets access to the user's location.
- Make the app “installable” and **work offline** by adding data in user's localStorage