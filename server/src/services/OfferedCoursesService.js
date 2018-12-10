const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const Course = require('../../../models/Course');

class OfferedCoursesService {

  constructor(input) {
    this.input = input;
  }

  save = () => {
    parse(input)
      .then(output => {
        
      })
      .catch(err => {
        // do something with err
      });
  }

}

export default OfferedCoursesService;