DROP TABLE IF EXISTS credit_requirement_course_info;
DROP TABLE IF EXISTS exception_course_info;
DROP TABLE IF EXISTS specialization_credit_requirement;
DROP TABLE IF EXISTS exception;
DROP TABLE IF EXISTS course_category;
DROP TABLE IF EXISTS course_term;
DROP TABLE IF EXISTS course_info_requirement;
DROP TABLE IF EXISTS course_info_corequirement;
DROP TABLE IF EXISTS specialization_course;
DROP TABLE IF EXISTS plan_course;
DROP TABLE IF EXISTS credit_requirement;
DROP TABLE IF EXISTS term;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS specialization;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS plan;
DROP TABLE IF EXISTS degree;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS course_info;


CREATE TABLE course_info (
  id                  VARCHAR(9) NOT NULL PRIMARY KEY,
  credits             INT,
  name                VARCHAR(100),
  description         VARCHAR(1000),
  standingRequirement INT
);

CREATE TABLE user_course_info (
  uid INT,
  cid VARCHAR(9),

  FOREIGN KEY (uid)
    REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (cid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (uid, cid)
);

CREATE TABLE course (
  id    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code  VARCHAR(9),

  FOREIGN KEY (code)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE degree (
  id    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100)
);

CREATE TABLE specialization (
  id    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100),
  did   INT,

  FOREIGN KEY (did)
    REFERENCES degree(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE credit_requirement (
  id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  credits     INT,
  category    VARCHAR(100),
  exceptionId INT
);

CREATE TABLE exception (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category  VARCHAR(100)
);

CREATE TABLE exception_course_info (
  eid  INT,
  cid  VARCHAR(9),

  FOREIGN KEY (eid)
    REFERENCES exception(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (cid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (eid, cid)
);

CREATE TABLE session (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  startYear CHAR(4),
  season    CHAR(1)
);

CREATE TABLE user (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email     VARCHAR(320),
  password  CHAR(60),
  firstname VARCHAR(100),
  lastname  VARCHAR(100),
  isAdmin   BOOLEAN DEFAULT false,
  standing  INT
);

CREATE TABLE plan (
  id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  time        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(500),
  isDefault   BOOLEAN DEFAULT false,
  isFavourite BOOLEAN DEFAULT false,
  uid         INT,
  did         INT,

  FOREIGN KEY (uid)
    REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
  
  FOREIGN KEY (did)
    REFERENCES degree(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE term (
  id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  num INT,
  sid INT,

  FOREIGN KEY (sid)
    REFERENCES session(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE plan_course (
  pid INT,
  cid INT,

  FOREIGN KEY (pid)
    REFERENCES plan(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (cid)
    REFERENCES course(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE specialization_credit_requirement (
  spid  INT,
  crid   INT,

  FOREIGN KEY (spid)
    REFERENCES specialization(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (crid)
    REFERENCES credit_requirement(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (spid, crid)
);

CREATE TABLE course_info_requirement (
  cid VARCHAR(9),
  rid VARCHAR(9),

  FOREIGN KEY (cid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (rid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (cid, rid)
);

CREATE TABLE course_info_corequirement (
  cid VARCHAR(9),
  rid VARCHAR(9),

  FOREIGN KEY (cid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (rid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (cid, rid)
);

CREATE TABLE course_term (
  cid INT,
  tid INT,

  FOREIGN KEY (cid)
    REFERENCES course(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (tid)
    REFERENCES term(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (cid, tid)
);

CREATE TABLE credit_requirement_course_info (
  crid  INT,
  cid   VARCHAR(9),

  FOREIGN KEY (crid)
    REFERENCES credit_requirement(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (cid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (crid, cid)
);


INSERT INTO course_info (id) VALUES ("ENGL 112");
INSERT INTO course_info (id) VALUES ("ENGL 114");
INSERT INTO course_info (id) VALUES ("ENGL 113");
INSERT INTO course_info (id) VALUES ("ENGL 150");
INSERT INTO course_info (id) VALUES ("ENGL 151");
INSERT INTO course_info (id) VALUES ("ENGL 153");
INSERT INTO course_info (id) VALUES ("MATH 100");
INSERT INTO course_info (id) VALUES ("MATH 101");

INSERT INTO course_info (id) VALUES ("PHYS 111");
INSERT INTO course_info (id) VALUES ("PHYS 112");
INSERT INTO course_info (id) VALUES ("PHYS 102");
INSERT INTO course_info (id) VALUES ("PHYS 121");
INSERT INTO course_info (id) VALUES ("PHYS 122");
INSERT INTO course_info (id) VALUES ("CHEM 111");
INSERT INTO course_info (id) VALUES ("CHEM 121");
INSERT INTO course_info (id) VALUES ("CHEM 113");
INSERT INTO course_info (id) VALUES ("CHEM 123");
INSERT INTO course_info (id) VALUES ("COSC 111");
INSERT INTO course_info (id) VALUES ("COSC 123");
INSERT INTO course_info (id) VALUES ("COSC 121");
INSERT INTO course_info (id) VALUES ("COSC 211");
INSERT INTO course_info (id) VALUES ("COSC 221");
INSERT INTO course_info (id) VALUES ("COSC 222");
INSERT INTO course_info (id) VALUES ("MATH 200");
INSERT INTO course_info (id) VALUES ("MATH 221");
INSERT INTO course_info (id) VALUES ("STAT 230");
INSERT INTO course_info (id) VALUES ("COSC 304");
INSERT INTO course_info (id) VALUES ("COSC 310");
INSERT INTO course_info (id) VALUES ("COSC 320");
INSERT INTO course_info (id) VALUES ("COSC 341");
INSERT INTO course_info (id) VALUES ("PHIL 331");
