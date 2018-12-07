const warningService = require('../../src/services/WarningService');
const assert = require('chai').assert;

describe("WarningService", () => {
  
  describe("#getWarningsForCourse()", () => {
    
    it("should a return standing warning when one exists", () => {
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

      let plan = {};

      const expectedWarnings = [
        {
          message: "COSC 341 requires year 3. Current standing: 2",
          type: "standing"
        }
      ];

      const actualWarnings = warningService.getWarningsForCourse(plan, user, course);

      assert.deepEqual(actualWarnings, expectedWarnings);

    });
  });
});