# SLEEP MONITOR APP

### About the Sleep Monitor App
The sleep monitor app is built using [React](https://react.dev/learn/installation), [TypeScript](https://www.typescriptlang.org/), [NodeJs](https://nodejs.org/en), and [Postgres](https://www.postgresql.org/).
The styling of the app uses [TailWindCss](https://tailwindcss.com/)
Unit test was written for this app using [jest](https://jestjs.io/) and all 14 test cases passed.
The charts for display uses [Apache Echarts](https://echarts.apache.org/handbook/en/get-started/) and the app interfaced with Echarts using this [npm package](https://www.npmjs.com/package/echarts)


The app has 4 main pages
- Home Page
This contains the links to register and also preview any registration
- Register Page
This page is where the actual filling of the form begins with name, gender, date , and sleep time duration in hours
- Preview Page
This displays the data saved for every registration as well as a chart 
- No Page
This is a 404 page

The app uses localstorage to improvise for a real database;

### Time Estimate
- Estimated Time to completion = 15 Hours

### To Clone / Download the app
-  Download the app by visiting [Github maxteebabs](https://github.com/maxteebabs/sleep-monitor/tree/master)
```sh
git clone https://github.com/maxteebabs/sleep-monitor.git
```

### To Start the Frontend application
- First Install Dependencies
```sh
npm install
```
- Start the app
```sh
npm start
```

### To Start the Backend application
```sh
cd server
```
- For firsttime
```sh
sh ./bin/start.sh --build 
```
- subsequently
```sh
sh ./bin/start.sh
```
- Create the database
```sh
sh ./bin/db_restore.sh
```

### To Stop the Backend application
```sh
sh ./bin/stop.sh
```
### To check for server logs
```sh
 docker logs -f sleepmonitor.api
```

### if you encounter any error, because of envsubst, then follow this step
```sh
brew install gettext
brew link --force gettext 
```

### To run test
```sh
npm test
```

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


### Screenshots

![Sleep Monitor Image](screenshot.png "Sleep Monitor")

![Sleep Monitor Image](screenshot3.png "Sleep Monitor")

![Sleep Monitor Image](screenshot2.png "Sleep Monitor")


