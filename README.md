# tower-calender

> A calender tool for managing deadlines on tower.im

This project consists of two main parts

- A script which should be injected into the webpage on [https://tower.im/](https://tower.im/). It will capture the deadline keywords for you, and then save data on your browser's localStorage.
- A visualization tool to help you manage your deadlines. It reads from your browser's localStorage and gives out a webpage based on Vue.js and ElementUI.

## Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
