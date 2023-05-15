# Weather App

This is a simple weather app built with Vue and TypeScript that allows users to search for weather information for different cities around the world.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Installation

1. Clone the repository to your local machine:
   `git clone https://github.com/your-username/weather-app.git`

2. Navigate to the project directory:
   `cd weather-app`
3. Install dependencies:
   `npm install`

## Usage

To run the app in development mode, use the following command:

`npm run dev`

This will start a development server at http://localhost:5173/, where you can view the app in your browser.

To build the app for production, use the following command:

`npm run build`

This will generate a production-ready build of the app in the dist/ directory.

## Dependencies

The app depends on the following packages:

    axios: "^1.4.0",
    uid: "^2.0.2",
    vue: "^3.2.47",
    vue-router: "^4.1.6",
    vuex: "^4.0.2",
    vuex-persistedstate: "^4.1.0"

## API Keys

This app uses the [OpenWeatherMap API](https://openweathermap.org/) to fetch weather data, and [MapBox API](https://www.mapbox.com/) to fetch locations. To use the app, you will need to obtain an API key from OpenWeatherMap, MapBox, then create a .env file and add it to the file:

VITE_MAPBOX_API_KEY="YOUR_API_KEY_HERE"
VITE_OPENWEATHER_API_KEY="YOUR_API_KEY_HERE"

Replace YOUR_API_KEY_HERE with your actual API key.
