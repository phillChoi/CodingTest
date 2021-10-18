const express = require('express');
const fs = require('fs');
const app = express();
const directory = "./output/orders.json";
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
        customer:req.body.customer
    };
    try{
        //Check if there already is an output JSON file (used to simulate database).
        if (fs.existsSync(directory)){
            //console.log("This file exists");
            fs.readFile(directory, 'utf-8', (error, jsonFile) => {
                if (error) {
                    console.log("Error reading file: " + error);
                } else {
                    let data = JSON.parse(jsonFile);//Store existing JSON to variable
                    response.id = data.length + 1; //Update ID for order
                    data.push(response);
                    let order = JSON.stringify(data, null, 2);
                    //Update existing data
                    fs.writeFile(directory, order, err2 => {
                        if (err2){
                            console.log("There has been an error: "+err2);
                        }else {
                            console.log("Order successfully added.")
                            res.end(JSON.stringify(response)); 
                        }
                    })
                }
            })
    
        } else { 
            //Create JSON file if doesn't exist. 
            let databaseArray = [];
            databaseArray.push(response);
            let order = JSON.stringify(databaseArray, null, 2);
            fs.writeFile(directory, order, err5 => {
                if(err5){
                    console.log("There has been an error: "+err5);
                } else {    
                    console.log("Database Successfully created at: "+directory);
                }
            });
            res.end(JSON.stringify(response)); 
        };
    } catch(err){
        console.log(err);
    }; 
}); 

app.get('/orders/:id', function (req, res){
    let id = req.params.id;
    fs.access(directory, (err)=> {
        if(err){
            console.log("File not found: "+err);
        }else{
            //Fetching data stored in orders.json
            fs.readFile(directory, (err2, jsonFile) =>{
                if(err2){
                    console.log(err2);
                }else{
                    let data = JSON.parse(jsonFile);
                    let found = false;
                    //Simple for loop to iterate through JSON data.
                    for(i = 0; i < data.length; i++){
                        let entryId = data[i].id;
                        if(entryId == id){
                            console.log("Order found");
                            console.log(data[i]);
                            res.end(JSON.stringify(data[i],null,2));
                            found = true;
                            break;
                        }
                    };
                    if (!found){
                        console.log("Entry ID not found.");
                    };
                };
            });
        };
    });
});

app.get('/orders/:type/:date', function(req,res){
    let type = req.params.type;
    let date = req.params.date;
    let fDate = date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8); //Reformatted date to match stored dates.
    fs.access(directory, (err) => {
        if(err){
            console.log("File not found: "+err);
        }else{
            fs.readFile(directory, (err2, jsonFile) => {
                if (err2){
                    console.log(err2);
                }else{
                    let data = JSON.parse(jsonFile);
                    //console.log(data);
                    let counter = 0;
                    let orders = [];
                    let customers = [];
                    data.forEach(element => {
                        //Check for matching type and date.
                        if(element.type == type && element.date == fDate){
                            counter++
                            orders.push(element.id);
                            //Only push in unique customer names.
                            if(customers.indexOf(element.customer) === -1){
                                customers.push(element.customer);
                            }
                        }; 
                    }); 
                    //Final check if any orders were found.
                    if(counter == 0){
                        console.log("There are no orders for this type and date.");
                        res.end("No orders were found.");
                    }else{
                        let response = {
                            type: req.params.type,
                            count: counter,
                            orders: orders,
                            "related-customers": customers
                        };
                        console.log(response);
                        res.end(JSON.stringify(response,null,2));
                    };
                };
            });
        };
    });
});