const specializationRequirementService = require('../../src/services/SpecializationRequirementsService');
const assert = require('chai').assert;

describe("SpecializationRequirementService", () => {
  
  describe("#parseCourses", () => {

    it("should return valid empty course requirements", async () => {
      const specificCourseRequirements = '';

      const expectedCourses = {
        courses: [],
        type: "courses"
      };

      const courses = await specializationRequirementService.parseCourses(specificCourseRequirements);

      assert.deepEqual(courses, expectedCourses);
    });

    it("should return valid specific course requirements", async () => {
      const specificCourseRequirements = "COSC 111, COSC 121";

      const expectedCourses = {
        courses: ["COSC 111", "COSC 121"],
        type: "courses"
      };

      const courses = await specializationRequirementService.parseCourses(specificCourseRequirements);

      assert.deepEqual(courses, expectedCourses);
    });

    it("should return valid general course requirements", async () => {
      const specificCourseRequirements = "UPPER GENERAL";

      const expectedCourses = {
        courses: ["UPPER GENERAL"],
        type: "category"
      };

      const courses = await specializationRequirementService.parseCourses(specificCourseRequirements);

      assert.deepEqual(courses, expectedCourses);
    });
  });

});