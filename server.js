const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const myServer = http.createServer((req , res) => {
     console.log('A request has been made');
    /*console.log(req);
    console.log(req.url , req.method); */
    const num = _.random(0,10);
    console.log(num);
    //--------setting the header--------

     res.setHeader('Content-Type' , 'text/html');
    /*res.write('<h1>Hello there !</h1>');
    res.end(); */

    let path = './views/' ;
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about' :
            path += '/about.html';
            res.statusCode = 200;
            break;
            case '/about-me' :
            res.setHeader('Location' , '/about')
            res.statusCode = 301;
            res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

fs.readFile(path , (err , data) => {
    if(err){
        console.log(err);
        res.end();
    }
    else {
        res.write(data);
        res.end();
    }
})

});
myServer.listen( 3000 , 'localhost' , () =>{
console.log('Listening to requests on port 3000');
});
