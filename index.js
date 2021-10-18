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
        name:req.body.customer
    };
    try{
        //Check if there already is an output JSON file (used to simulate database).
        if (fs.existsSync(directory)){
            console.log("This file exists");
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
                            console.log("File Successfully updated.")
                            res.end(JSON.stringify(response)); 
                        }
                    })
                }
            })
    
        } else { 
            //Create JSON file if not exists   
            let databaseArray = [];
            databaseArray.push(response);
            //console.log(databaseArray);  
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
            console.log(err);
        }else{
            //Fetching data stored in orders.json
            fs.readFile(directory, (err2, jsonFile) =>{
                if(err2){
                    console.log(err2);
                }else{
                    let data = JSON.parse(jsonFile);
                    //console.log('File found.');
                    let found = false;
                    //Simple for loop to iterate through JSON data
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

app.get('orders/:type/:date',function(req,res){
    
});