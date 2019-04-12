const request = require('request');
const cheerio = require('cheerio');
//const db = require('../../../dbconnection');
const testArray = ['COSC', 'MATH'];
//const codeArray = ['COSC', 'MATH', 'ANTH', 'ASTR', 'BIOL', 'CHEM', 'CRWR', 'CCS', 'POLI', 'MDST', 'DATA', 'ECON', 'ENGL', 'FREN', 'GEOG', 'HEAL', 'PHIL', 'PSYO', 'SOCI', 'STAT', 'SPAN'];
testArray.forEach(element => {
  request('http://www.calendar.ubc.ca/okanagan/courses.cfm?go=name&code=' + element, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      var fullInfo = [];
      var standingreq;

     
      const double = $('.double dt');
     
      double.each((i, course) => {
        var id = $(course).text().match(/[a-zA-Z]{4} [0-9]{3,}/g)[0];
        var name = $(course).children('b').text(); 
        var credits =$(course).text().slice(10,11);
        var desc = $(course).next('dd').text().split(' [')[0];
        var prereq = $(course).next('dd').text().split(' Prerequisite:')[1];
        var coreq = $(course).next(' dd').text().split(' Corequisite:')[1];
        
        const objco = {
          coreq: [],
        };
        if(coreq){
         
          coreq = coreq.match(/[a-zA-Z]{4} [0-9]{3,}/g);
          objco.coreq.push(coreq);
            
        }
        const objpre = {
          allOf: [],
          oneOf: [],
            
        };

        if(prereq){
          prearray = prereq.split(" and ");
          prearray.forEach(prereq => {
            
            if(prereq.includes("hird-year")){
              standingreq = 3;
            }else if(prereq.includes("ourth-year")){
              standingreq = 4;
            }else{
              standingreq = 1;
            }
            startsWithOneOf = prereq.includes("One of" || "one of");
            startsWithAllOf = prereq.includes("All of" || "all of");

        
            if(startsWithOneOf == true){
              prereq = prereq.match(/[a-zA-Z]{4} [0-9]{3,}/g);
              objpre.oneOf.push(prereq);
              console.log(objpre);
            }
            if(startsWithAllOf == true){
              prereq = prereq.match(/[a-zA-Z]{4} [0-9]{3,}/g);
              objpre.allOf.push(prereq);
              console.log(objpre);
            }
          });
        }
        const courseObj = {
          //push everything organized into object 
          id: id,
          name: name,
          desc: desc,
          credits: credits,
          standingRequirment: standingreq,
          prereq: objpre,
          coreq: objco,
        
        };
        fullInfo.push(courseObj);
        //console.log(courseObj);
  
            
      });
      
    }
  
        
  });
});


