# [Webnero UI]

This is the User Interface for Webnero. 
Webnero is the Web Wallet for Electronero Network coins. 
Support for ETNX, ETNXP, LTNX, GLDX, and CRFI out-of-the-box. 

Deposit, Withdrawal, Transaction History, Swaps (soon), Stake (soon), Farm (soon), and more.  

To use the UI, connect to Electronero Passport API 
Get an API key here: <insert API key>
  
# Requirements
- Must have a connection to Electronero Passport API or your own API for the UI to function as intended. This is the live repository of Webnero hosted at https://webnero.electronero.org
- NodeJS/NPM or NodeJS/Yarn
- Bower
  
# Install (one-liner)
  ```bower init && bower install && npm i && gulp less && gulp deploy``` 
  The sym linked `*.html` files located in `./` will be hot loaded to `wallet/*` and you can serve the `*.html` directly from `./`
  
# Install (walk-through)
## Building from Source Files
  
  After cloning the repo take a look at the `gulpfile.js` and check out the tasks available:
* `gulp less` The less task will compile the LESS into the `dist` directory and minify the output.
* `gulp deploy` The default task will compile templates from NJK to HTML, and LESS and JS, then output into the `dist` directory and minify the output, and it will copy all vendor libraries from `bower_components` 
 
  Node Packages:
  Use npm or yarn to install dependencies.
```
npm install gulp-nunjucks-render --save-dev
npm install gulp-data --save-dev
```
  Bower Packages:
To update dependencies, run `bower update` and then run `gulp less && gulp deploy` to copy the updated dependencies
```
bower init
bower install
bower update
```



