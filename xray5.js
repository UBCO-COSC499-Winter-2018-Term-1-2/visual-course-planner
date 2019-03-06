var Xray = require('x-ray');
const fs = require('fs');
//const express = require('express');
//const router = express.Router();
//const scraper = require('../../xray');
//const promisify = require('util').promisify;
//const db = require('../../../dbconnection');
//db.query = promisify(db.query);
const x = Xray({

  filters: {
    trim: function (value) {
      return typeof value == 'string' ? value.split(' Prerequisite:' || ' Corequisite') : value
    },

    slice: function (value, start, end) {
      return typeof value === 'string' ? value.slice(0, 9) : value
    },

    slice2: function (value, start, end) {
      return typeof value === 'string' ? value.slice(10, 11) : value
    },

    
  }

});

const testArray = ['COSC', 'MATH'];
const codeArray = ['COSC', 'MATH', 'ANTH', 'ASTR', 'BIOL', 'CHEM', 'CRWR', 'CCS', 'POLI', 'MDST', 'DATA', 'ECON', 'ENGL', 'FREN', 'GEOG', 'HEAL', 'PHIL', 'PSYO', 'SOCI', 'STAT', 'SPAN'];

testArray.forEach(element => {

  x('http://www.calendar.ubc.ca/okanagan/courses.cfm?go=name&code=' + element, '#UbcMainContent',
    [{
      id: ['dt | slice'],
      name: ['b'],
      credits: ['dt | slice2'],
      desc: ['dd '],



    }])(function (err, obj) {
      console.log(obj);


      // try {
      //    const response = await axios.post('api/scraper', 
      //  obj,  
      // {
      //  headers: { "Content-Type": "application/json" }
      //}
      //);


      //} catch(err) {
      //console.log(err);
      // }  
    })



});







