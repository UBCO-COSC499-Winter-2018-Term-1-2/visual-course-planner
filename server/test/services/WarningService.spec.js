const warningService = require('../../src/services/WarningService');
const assert = require('chai').assert;

describe("WarningService", () => {
  
  describe("#getWarningsForCourse()", () => {

    it("should return a prereq wrong term warning when one exists", () => {
      let user = {
        name: "Test",
        standing: 1
      };
  
      let courseNoPrereq = {
        code: "COSC 121",
        standingRequirement: 0,
        coRequisites: [],
        preRequisites: [ { code: "COSC 111" } ],
        year: "2018",
        term: "1"
      };
  
      let plan = {
        courses: [courseNoPrereq]
      };
  
      const expectedWarnings = [
        {
          message: "COSC 121 missing pre-requisite COSC 111.",
          type: "prereq"
        }
      ];
  
      const actualWarnings = warningService.getWarningsForCourse(plan, user, courseNoPrereq);
  
      assert.deepEqual(actualWarnings, expectedWarnings);
    });
    
    it("should return a standing warning when one exists", () => {
      let user = {
        name: "Test",
        standing: 2
      };

      let course = {
        code: "COSC 341",
        standingRequirement: 3,
        coRequisites: [],
        preRequisites: []
      };

      let plan = {
        courses: []
      };

      const expectedWarnings = [
        {
          message: "COSC 341 requires year 3. Current standing: 2.",
          type: "standing"
        }
      ];

      const actualWarnings = warningService.getWarningsForCourse(plan, user, course);

      assert.deepEqual(actualWarnings, expectedWarnings);

    });

    it("should return a coreq missing warning when one exists", () => {
      let user = {
        name: "Test",
        standing: 3
      };

      let course = {
        code: "COSC 304",
        standingRequirement: 3,
        coRequisites: [{
          code: "COSC 360"
        }],
        preRequisites: [],
        year: "2018",
        term: "1"
      };

      let plan = {
        courses: [course]
      };

      const expectedWarnings = [
        {
          message: "COSC 304 missing co-requisite COSC 360.",
          type: "coreq"
        }
      ];

      const actualWarnings = warningService.getWarningsForCourse(plan, user, course);

      assert.deepEqual(actualWarnings, expectedWarnings);
    });

    it("should return a coreq wrong term warning when one exists", () => {
      let user = {
        name: "Test",
        standing: 1
      };

      let courseAdded = {
        code: "MATH 221",
        standingRequirement: 0,
        coRequisites: [{
          code: "MATH 101"
        }],
        preRequisites: [],
        year: "2018",
        term: "1"
      };

      let preExistingCourse = {
        code: "MATH 101",
        standingRequirement: 0,
        coRequisites: [],
        preRequisites: [],
        year: "2018",
        term: "2"
      };

      let plan = {
        courses: [courseAdded, preExistingCourse]
      };

      const expectedWarnings = [
        {
          message: "MATH 101 needs to be in the same term as MATH 221, or earlier.",
          type: "coreq"
        }
      ];

      const actualWarnings = warningService.getWarningsForCourse(plan, user, courseAdded);

      assert.deepEqual(actualWarnings, expectedWarnings);
    });
  });

  describe("#getWarnings()", () => {
    it("empty plan should return no warnings", () => {
      let plan = {
        courses: []
      };

      let user = {
        name: "Test",
        standing: "1"
      };
      const expectedWarnings = [];
      const acutalWarnings = warningService.getWarnings(plan, user);
      assert.deepEqual(acutalWarnings, expectedWarnings);
      
    });

    it("should return a prereq wrong term warning when one exists", () => {
      let user = {
        name: "Test",
        standing: 1
      };
  
      let preReqWrongTerm = {
        code: "COSC 111",
        standingRequirement: 0,
        coRequisites: [],
        preRequisites: [],
        year: "2018",
        term: "2"
      };
  
      let courseBeforePrereq = {
        code: "COSC 121",
        standingRequirement: 0,
        coRequisites: [],
        preRequisites: [ { code: "COSC 111" } ],
        year: "2018",
        term: "1"
      };
  
      let plan = {
        courses: [courseBeforePrereq, preReqWrongTerm]
      };
  
      const expectedWarnings = [
        {
          message: "COSC 111 must be taken earlier than COSC 121.",
          type: "prereq"
        }
      ];
  
      const actualWarnings = warningService.getWarnings(plan, user, []);
  
      assert.deepEqual(actualWarnings, expectedWarnings);
    });

    it("should return a prereq wrong term warning when one exists", () => {
      let user = {
        name: "Test",
        standing: 1
      };
  
      let courseNoPrereq = {
        code: "COSC 121",
        standingRequirement: 0,
        coRequisites: [],
        preRequisites: [ { code: "COSC 111" } ],
        year: "2018",
        term: "1"
      };
  
      let plan = {
        courses: [courseNoPrereq]
      };
  
      const expectedWarnings = [
        {
          message: "COSC 121 missing pre-requisite COSC 111.",
          type: "prereq"
        }
      ];
  
      const actualWarnings = warningService.getWarnings(plan, user, []);
  
      assert.deepEqual(actualWarnings, expectedWarnings);
    });
  });

  describe("#getWarningsForSpecialization", () => {
    it("should return a requirement warning for specialization when one exists", () => {
      const specializationRequirements = [
        {
          courses: "COSC 111",
          credits: 3
        },
        {
          courses: "MATH 100",
          credits: 3
        }
      ];

      const plan = {
        name: "Test Plan",
        courses: [
          {
            code: "COSC 111",
            standingRequirement: 0,
            coRequisites: [],
            preRequisites: [],
            year: "2018",
            term: "1",
            credits: 3
          }
        ]
      };

      const expectedWarnings = [
        {
          message: `Missing ${specializationRequirements[1].credits} credits of ${specializationRequirements[1].courses}.`,
          type: "missingCredits"
        }
      ];
      
      const actualWarnings = warningService.getSpecializationWarnings(plan, specializationRequirements);

      assert.deepEqual(actualWarnings, expectedWarnings);
    });

    it("should return no warnings when all requirements are satisfied", () => {
      const specializationRequirements = [
        {
          courses: "COSC 111",
          credits: 3
        },
        {
          courses: "MATH 100",
          credits: 3
        }
      ];

      const plan = {
        name: "Test Plan",
        courses: [
          {
            code: "COSC 111",
            standingRequirement: 0,
            coRequisites: [],
            preRequisites: [],
            year: "2018",
            term: "1",
            credits: 3
          },
          {
            code: "MATH 100",
            standingRequirement: 0,
            coRequisites: [],
            preRequisites: [],
            year: "2018",
            term: "1",
            credits: 3
          }
        ]
      };

      const expectedWarnings = [];
      
      const actualWarnings = warningService.getSpecializationWarnings(plan, specializationRequirements);

      assert.deepEqual(actualWarnings, expectedWarnings);
    });

    it("should return warning from multi course requirement when one exists", () => {
      const specializationRequirements = [
        {
          courses: "COSC 111",
          credits: 3
        },
        {
          courses: "MATH 100, MATH 101",
          credits: 6
        }
      ];

      const plan = {
        name: "Test Plan",
        courses: [
          {
            code: "COSC 111",
            standingRequirement: 0,
            coRequisites: [],
            preRequisites: [],
            year: "2018",
            term: "1",
            credits: 3
          },
          {
            code: "MATH 100",
            standingRequirement: 0,
            coRequisites: [],
            preRequisites: [],
            year: "2018",
            term: "1",
            credits: 3
          }
        ]
      };

      const expectedWarnings = [
        {
          message: `Missing 3 credits of ${specializationRequirements[1].courses}.`,
          type: "missingCredits"
        }
      ];
      
      const actualWarnings = warningService.getSpecializationWarnings(plan, specializationRequirements);

      assert.deepEqual(actualWarnings, expectedWarnings);
    });

    
  });
});