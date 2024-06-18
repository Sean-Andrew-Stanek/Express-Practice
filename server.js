const express = require('express'),
    app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Extract username from URL
//Ref: XXXXXXXX
const userRegex = /user\/([^\/]+)/i;
app.use((req, res, next) => {
    const match = req.url.match(userRegex);
    
    if(match)
        res.locals.username = match[1];

    const userName = req.body.username || '';
    if(userName === '')
        res.locals.auth = 'You should really give me a username in the body';
    else if(userName === match[1])
        res.locals.auth = 'You seem to be in the right place';
    else
        res.locals.auth = 'Danger Will Robinson, Danger!';

    next();
});

//Push variable
//Ref: YYYYYYYY
app.use('/user', (req, res, next) => {
    res.locals.greeting = 'Hello';
    next();
});


//Example 1 - Try this endpoint
app.get('/user/:name', (req, res) =>{
    const greeting = res.locals.greeting || 'Greetings';  // Says 'Hello' from: YYYYYYYY
    const username = res.locals.username || 'USERNAME UNDETECTED'; // Gets the username from the regex in:  XXXXXXXX
    const authMessage = res.locals.auth || '';  // Should customize the message based on the JSON 
    
    res.send(`${greeting} ${username}<br>${authMessage}`);
});

//Example 2 - Try this endpoint
app.get('/home/user/:name', (req, res) => {
    
    const greeting = res.locals.greeting || 'Greetings'; // Doesn't use YYYYYYYY, so will default
    const username = res.locals.username || 'USERNAME UNDETECTED';  // Gets the username from the regex in:  XXXXXXXX
    const authMessage = res.locals.auth || '';  // Should customize the message based on the JSON 

    res.send(`${greeting} ${username}<br>${authMessage}`);
});

app.listen(8080, '0.0.0.0', () => {
    console.log('Listening on Port: 8080');
});