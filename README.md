# ReactCalculator
js calculator based on win10 calculator made with react

## Requirements

- node.js
- npm
- mongoDb
- gulp
- webpack

## To start

- npm install
- gulp

## Other information

This calculator uses eval() function, so the most of errors are the result of this function behavior. So it can return float when you want to sum some integers, or you can see some other surprises.

When you click "=", entered string pass to eval(). It means that it will be handled depending on operation significance, so 2+2*2 equals 6.

App requires installed mongoDB, if it can't connect to mongo server, then it will be wrote in terminal.

The bahavior of calculator is an attempt to copy the behavior of win10 calculator. For the design the same.

The app was tested on FF, Google Chrome, Edge, IE.
