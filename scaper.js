const fs = require('fs');
const csv = require('fast-csv');
const db = require('../../../dbconnection');

db.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});


let counter = 0;



//let data = [];

let csvStream = csv.fromPath(".\\csv\\coursesOffered.csv")
    .on("data", function(record){
        csvParse();

        if(counter < 100){
    
    let id = record.id;
    let name = record.name;
    let code = record.name;
    let description = record.description;
    let standingrequirement = record.standingrequirement;

    db.query("INSERT INTO courses(id,name,code,description,standingrequirement) VALUES($1, $2, $3, $4, $5)", [id,name,code,description,standingrequirement] , function(err){
        if(err)
        {
            console.log(err);
        }
    });
    ++counter;
}

csv.Resume();
    }).on("end", function(){
        console.log("Job is done");
    }).on("error", function(err){
        console.log(err);
    })
