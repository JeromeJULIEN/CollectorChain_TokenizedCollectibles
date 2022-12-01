# Base project directory using Truffle, React, Redux and web3

## Client app created with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Client app is in ```/client```

### Available Scripts

In the ```/client``` directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Store structure
The store is structured using Redux in ```/client/src/store```

There is two reducer in ```/client/src/store/reducers``` :
- One dedicated to front app data,called ```app```
- One dedicated to web3 constants, called ```web3```

Actions are also structured with the same logic


## Smart contract was create using truffle init

It include a `simpleStorage.sol` contract

Migration script is configured for ganache

### Available scripts
#### `truffle migrate`
Launch the compilation of the selected contract in the directory `/client/src/contracts`