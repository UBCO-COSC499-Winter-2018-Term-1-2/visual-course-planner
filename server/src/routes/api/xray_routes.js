const express = require('express');
const router = express.Router();
const scraper = require('../../xray');




router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);

    //module.exports = {
      //  async insertCourseInfo(id, name, credits, desc) {
        //  const results = await db.query("INSERT INTO course_info (id, name , credits, desc ) VALUES (?, ?, ?, ?)", [id], [name], [credits], [desc]);
          
        //},
    

    //};
});
