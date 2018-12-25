const termService = require('./TermService');
const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const course = require('../models/Course');
const sessionService = require('../services/SessionService');
const specializationModel = require('../models/Specialization');
const readFile = promisify(require('fs').readFile);

module.exports = {
  async setSpecializationRequirementsFromCsv(filePath, specialization) {
    console.log("Creating spec");
    // create specialization
    await specializationModel.createSpecialization(specialization);
    try {
      const file = await readFile(filePath);
      const specialization = await this.validateSpecializationRequirements(file);
      console.log("Adding: " + specialization.toString());
      await this.addSpecializationRequirements(specialization);
      
    } catch(err) {
      console.error(err);
    }
  },

  async addSpecializationRequirements(specialization) {
    for(const element of specialization) {
      // add new specialization
      // check if course exists
      const courseExists = await this.degree(element.code);
      if(!courseExists){
        throw new Error(`Couldnt find info for course ${element.code}`);
      }

      const session = await sessionService.ensureSession(element.year, element.season);
  
      // ensure term exists
      const term = await termService.ensureTerm(element.term, session.id);
  
      await course.insertCourse(element.code, term.id);
    }
  },

  async validateSpecializationRequirements(file) {
    let records = [];
    try {
      records = await parse(file, { columns: true, trim: true });
    } catch(err) {
      throw new Error(err);
    }
    const requirements = records.map(record => {
      // map record to req object
      return {
        // requirements object
      };
    });
    return requirements;
  }
};