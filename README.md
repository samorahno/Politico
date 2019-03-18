[![Build Status](https://travis-ci.org/samorahno/Politico.svg?branch=develop)](https://travis-ci.org/samorahno/Politico)
[![Coverage Status](https://coveralls.io/repos/github/samorahno/Politico/badge.svg?branch=develop)](https://coveralls.io/github/samorahno/Politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/29fbbcc84f643842af10/maintainability)](https://codeclimate.com/github/samorahno/Politico/maintainability)

# Politico

Politico is an app that helps both the politicians and citizens. It helps citizens give mandates to politicians running for different offices

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
```
A Web Browser
```


# Installation
- Install [NodeJs](https://nodejs.org/en/download/).
- Clone this repository using git clone ```https://github.com/samorahno/Politico.git``` .
- Run ```npm install``` to install all dependencies.
- Run ```npm start``` to start the server.
- Navigate to ```localhost:3000/api/v1``` in your browser to access the application.

# Testing Tools
- [Mocha](https://mochajs.org/) - A Javascript test framework.
- [Chai](http://chaijs.com/) - Assertion library.

## Running the tests
 The tests were written using Mocha and Mocha-http
- To run tests, navigate to the project's root directory
- After installation, the following command - ```npm run test```

# Templates
UI templates are hosted on Github pages [here](https://samorahno.github.io/Politico/UI/)

## Built With

- [Node.js](https://nodejs.org/) - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
- [Express.js](https://expressjs.com/) - Web framework based on Node.js.
- [Babel](https://babeljs.io/) - Javascript transpiler.
- [Eslint](https://eslint.org/) - Javascript linter.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript) was followed.

# API Docs
[https://samson-politico.herokuapp.com/api-docs](https://samson-politico.herokuapp.com/api-docs)

# API Information
Heroku [https://samson-politico.herokuapp.com/api/v1/](https://samson-politico.herokuapp.com/api/v1/)

| Method | Description | Endpoints |
| :---: | :---: | :---: |
| GET | Get all Parties | /api/v1/parties |
| GET | Get all Offices |    /api/v1/offices/ |
| GET | Get a Party | api/v1/parties/:partyid |
| GET | Get an office| api/v1/offices/:officeid|
| GET | view vote result for offices | api/v1/office/:officeid/result |
| PATCH | Edit a party | api/v1/parties/:partyid/name |
| POST | Creat a paty | api/v1/parties/|
| POST | Create an office | api/v1/offices/ |
| POST | Create a user | api/v1/auth/signup |
| POST | login a user | api/v1/auth/login |
| POST | vote for a candidate | api/v1/vote |
| POST | login a user | api/v1/auth/login |
| DELETE | Delete a paty | api/v1/parties/:partyid |

# Author
- Abosede Samson Olawale

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details