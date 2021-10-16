const express = require('express');
const fs = require('fs');
const app = express();

//-----Client Setup---------
app.use(express.static('pages'));
app.get('/index.html', function (req, res) {  
    res.sendFile( __dirname + "/" + "index.html" );  
});

app.post('/orders' ,function (req, res){
    //res.send(console.log("hello"));
    response = {
        model:req.query.type,
        name:req.query.customerName
    };
    console.log(response);  
    res.end(JSON.stringify(response));  
});

let server = app.listen( 8000, function() {
    console.log('server started');
});
