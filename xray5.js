var Xray = require('x-ray');

function scrape(){
//Create Xray Object to scrape
  const x = Xray({
    //add filters to customize strings
    filters: {

      trim: function (value) {
        return typeof value == 'string' ? value.split(' Corequisite:' || ' Prerequisite:')[0] : value;
      },
      trim1: function (value) {
        return typeof value == 'string' ? value.split(' Corequisite:')[1] : value;
      },
      trim2: function (value) {
        return typeof value == 'string' ? value.split(' Prerequisite:')[1] : value;

      },
      trim4: function (value) {
        return typeof value == 'string' ? value.split(' [')[0] : value;
      },
      grabPreReq: function (value) {
        return typeof value === 'string' ? value.split('') : value;
      },

      slicer: function (value, start, end) {
        return typeof value === 'string' ? value.slice(start, end) : value;
      },

      slice2: function (value, start, end) {
        return typeof value === 'string' ? value.slice(start, end) : value;
      },


    }

  });

  //change to codeArray to get all courses
  const testArray = ['COSC', 'DATA'];
  //const codeArray = ['COSC', 'MATH', 'ANTH', 'ASTR', 'BIOL', 'CHEM', 'CRWR', 'CCS', 'POLI', 'MDST', 'DATA', 'ECON', 'ENGL', 'FREN', 'GEOG', 'HEAL', 'PHIL', 'PSYO', 'SOCI', 'STAT', 'SPAN'];

  testArray.forEach(element => {
    //Scrape using xray 
    x('http://www.calendar.ubc.ca/okanagan/courses.cfm?go=name&code=' + element, '.double',
      {
        //gets each element from html tags and puts them into an object
        id: ['dt | slicer:0,8'],
        name: ['b'],
        credits: ['dt | slice2:10,11'],
        desc: ['dd | trim4'],
        prereq: ['dd | trim2'],
        coreq: ['dd | trim1'],


      })(function (err, obj) {
      //take each array out of the object
      const arrayID = obj.id;
      const arrayName = obj.name;
      const arrayCredits = obj.credits;
      const arrayDesc = obj.desc;
      const arrayPreReq = obj.prereq;
      const arrayCoReq = obj.coreq;
      

      var fullInfo = [];
      
      for (let i = 0; i < obj.prereq.length; i++) {
        //create pattern to look for course code in strings
        var patt = /[a-zA-Z]{4} [0-9]{3,}/g;
        let standingReq;
        var coreq = arrayCoReq[i];
        
        if (arrayCoReq[i]){
          coreq.forEach(c => {
            let objcoreq = {
              coreq: [],
            
            };
            c.match(patt);
            objcoreq.coreq.push({
              course: c
            });
          });
          
        }


        if (arrayPreReq[i]) {
          var custompre = arrayPreReq[i].toLowerCase().trim().split(" and ");
          var indexOfEq = arrayPreReq[i].indexOf(" Equivalency");
          var custompre2 = custompre.split(" or (b)");
          
        }
        if (indexOfEq != -1) {
          custompre2 = custompre2.substring(0, indexOfEq);
        }

          
        custompre2.forEach(p => {
          let objpre = {
            allOf: [],
            oneOf: [],
              
          };
      
          if (p.startsWith(" all of")) {
            const courses = p.match(patt);
            courses.forEach(ele => {
              objpre.allOf.push({
                type: "course",
                req: ele
              });
            });
            arrayPreReq[i] = objpre;
              
          }
          if (p.startsWith("one of") || p.startsWith(" one of")){
            const courses = p.match(patt);
            courses.forEach(ele => {
              objpre.oneOf.push({
                type: "course",
                req: ele
              });
            });
            arrayPreReq[i] = objpre;

          }


          if(p.contains("third-year standing")){
            standingReq = 3;

          } else if(p.contains("fourth-year standing")){
            standingReq = 4;
          }
        });

        fullInfo.push({
          //push everything organized into object 
          id: arrayID[i],
          name: arrayName[i],
          credits: parseInt(arrayCredits[i]),
          desc: arrayDesc[i],
          standingRequirment: standingReq,
          prereq: arrayPreReq[i],
          //coreq: customco,
        
        });
      
      }
      
    
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });
}
module.exports = scrape;

