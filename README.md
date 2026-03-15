# [AI Summarizer](https://aisummarizer-online.netlify.app/) &middot; [![Author Deepanshu Sharma](https://img.shields.io/badge/Author-Deepanshu%20Sharma-%3C%3E)](https://www.linkedin.com/in/deepanshu-sharma12/)

This is an app to simplify reading by condensing lengthy articles into concise summaries. User just need to paste the article URL and get the summary of that article transformed by AI.

## AI Summarizer

- An AI article summarizer
- Light and Dark Mode
- Created using React
- Save summaries into local storage

## Tech/framework used

- React + Vite
- Redux Toolkit (RTK Query)
- Tailwind CSS 
- Rapid API

## Features

- 🧠 **AI Article Summarization**  
  Uses NLP APIs to extract and generate short summaries from long web articles.

- ⚡ **Efficient API Handling**  
  Powered by Redux Toolkit (RTK Query) for optimized API calls and state management.

- 💾 **Local Storage History**  
  Saves user URL history in `localStorage` for quick access across sessions.

- 🎨 **Modern UI with Dark/Light Mode**  
  Built with Tailwind CSS featuring a responsive design and dynamic theme toggle.

- 🚀 **Fast Development & Build**  
  Built with React and Vite for fast development (HMR) and optimized production builds.

## Demo

Check out the live demo of the project [here](https://aisummarizer-online.netlify.app/).

## Screenshots

#### Landing

![Landing](/screenshots/screenshot-1.png)

#### Loading Screen

![Loading Screen](/screenshots/screenshot-2.png)

#### Summary

![Summary](/screenshots/screenshot-3.png)

#### Light Mode

![Light Mode](/screenshots/screenshot-4.png)

#### Mobile View
![Mobile View](/screenshots/screenshot-5.png)

## Starting the project

Open the [.env.example](/.env.example) and fill in your Rapid API key then save it as .env then run the following command:

```bash
npm install
# then
npm run dev
# to build
npm run build
```






