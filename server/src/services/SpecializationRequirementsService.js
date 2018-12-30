const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const specializationModel = require('../models/Specialization');
const readFile = promisify(require('fs').readFile);

module.exports = {
  async setSpecializationRequirementsFromCsv(filePath, specializationObj) {
    let file = [];
    try {
      file = await readFile(filePath);
    } catch(err) {
      throw new Error("Could not read file: " + err.toString());
    }
    
    const specializationReqs = await this.validateSpecializationRequirements(file);

    let requirements = [];
    if (specializationReqs === false) {
      throw new Error("Invalid CSV");
    } else {
      requirements = specializationReqs.map(record => {
        // map record to req object
        return {
          credits: record["CREDITS"],
          courses: record["COURSES"]
        };
      });
    }
    
    try {
      console.log("Creating spec");
      // create specialization  
      const specializationId = await specializationModel.createSpecialization(specializationObj);
      // add requirements to the spec
      console.log("Adding: " + JSON.stringify(specializationObj));
      await this.addSpecializationRequirements(requirements, specializationId);
    } catch (err) {
      throw new Error(err);
    }
  },

  async addSpecializationRequirements(requirements, specId) {
    // possibly need to await this
    requirements.forEach(req => {
      specializationModel.createSpecializationRequirement(req, specId);
    });
    
  },

  async validateSpecializationRequirements(file) {
    let records = [];
    try {
      records = await parse(file, { columns: true, trim: true });
    } catch(err) {
      console.error("Failed to parse csv: " + err);
      return false;
    }
    
    return records;
  }
};