const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
//-----Client Setup---------
app.use(express.static('pages'));


//----Server Setup------
let server = app.listen( 8000, function() {
    console.log('server started');
});


app.post('/orders', function (req, res) {  
    response = {  
        id: 1,
        title:req.body.title,
        date:req.body.date,
        type:req.body.type,  
        name:req.body.customer
    };  
    let data = JSON.stringify(response);
    console.log(response);  
    fs.writeFileSync('./output/orders.json', data);
    res.end(JSON.stringify(response));  
}); 


app.get('/orders', function (req, res){
    let id = req.query.id;
    response = {  
        id: 1,
        title:4,
        date:3,
        type:2, 
        name:1
    };  
    console.log(response);
    res.end(JSON.stringify(response));
});