const express = require('express');
const fs = require('fs');
const app = express();

//-----Client Setup---------
app.use(express.static('pages'));

//----Server Setup------
let server = app.listen( 8000, function() {
    console.log('server started');
});


app.get('/orders', function (req, res) {  
    response = {  
        id: 1,
        title:req.query.title,
        date:req.query.date,
        type:req.query.type,  
        name:req.query.customer
    };  
    console.log(response);  
    res.end(JSON.stringify(response));  
})  