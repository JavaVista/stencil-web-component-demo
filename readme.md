# Stencil Web-Component Demo

[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

This project is a demonstration of web components, presented at the Orlando Codecamp. It uses the Marvel API to fetch and display data about Marvel characters and also uses the Alpha Vantage API to fetch stock data. The project is built using Stencil, a compiler for building fast web apps using Web Components.

![Web Components](/stencil-web-components-demo.jpg)

Stencil is also great for building entire apps. For that, use the [stencil-app-starter](https://github.com/stencil-community/stencil-app-starter) instead.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your local development machine.
- A Marvel API key. You can get one from the [Marvel Developer Portal](https://developer.marvel.com/).
- Alpha Vantage API key. You can get one from the [Alpha Vantage API](https://www.alphavantage.co/).

### Installation

1. Clone the repository to your local machine:

```sh
git clone https://github.com/JavaVista/stencil-web-component-demo.git
```

Navigate into the project directory:

```bash
cd stencil-web-component-demo
```

Install the project dependencies:

```bash
npm install
```

To build the component for production, run:

```bash
npm run build
```

Create a `.env` file in the root directory of the project and add your Marvel API keys and Alpha Vantage API key like this:

```env
AV_KEY=your_alpha_vantage_key

PUBLIC_KEY=your_public_key
PRIVATE_KEY=your_private_key
```

Remember to replace `your_alpha_vantage_key`, `your_public_key` and `your_private_key` with your actual Alpha Vantage API key and Marvel API keys.

Start the development server:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3333`. You should see the web components in action.

To build the component for production, run:

```bash
npm run build
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).

## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the Ionic generated web components use the prefix `ion`.

## Using these components

There are three strategies we recommend for using web components built with Stencil.

The first step for all three of these strategies is to [publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/my-component@0.0.1/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install my-component --save`
- Put a script tag similar to this `<script type='module' src='node_modules/my-component/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc

### Using Components with API Service that are required

`SearchInputComponent, StockPriceComponent & StockFinderComponent` requires an `apiService` prop that implements the `ApiService` interface. This service is responsible for making API calls to fetch character data.

### Example

```javascript
import { MarvelApiService } from 'path/to/MarvelApiService';
import 'path/to/search-input-component';

const apiService = new MarvelApiService();

<search-input-component apiService={apiService}></search-input-component>
```


## Usage

In the 'Stock Price' component, enter a stock symbol and click 'Get Price'. In the 'Stock Finder' component, enter the name of a stock and click 'Find Stock'. Then, select a stock from the list to display its price in the 'Stock Price' component. Additionally, you can enter a Marvel character's name in the search box and click the 'Submit' button. The application will then display information about the selected character. To search for a character, type the name in the input box and select a character from the autocomplete list. The details of the selected character will then be populated.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to the [Orlando Code Camp](https://orlandocodecamp.com/) for the opportunity to present this project.
- Thanks to Marvel for providing the API.
- Thanks to Alpha Vantage for providing the API.
