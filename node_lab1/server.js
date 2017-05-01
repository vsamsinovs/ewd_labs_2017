import express from 'express';
//Add greeting module
import greeting from './greeting';

import config from './config';
//create an express app
const app = express();
console.log(config)
// Configure the app to serve up content from public directory
app.use(express.static('public'));

//add route for /greeting
app.get('/greeting',(req, res)=>{
  const language = req.headers["accept-language"];
  const resp_language = greeting[language]?language:'en';
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end(greeting[resp_language]);
});

app.listen(config.port)

// Put a friendly message on the terminal
console.log("Server running on port " +config.port);