DROP TABLE IF EXISTS plan_term;
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
DROP TABLE IF EXISTS user_course_info;
DROP TABLE IF EXISTS term;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS plan;
DROP TABLE IF EXISTS specialization;
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
  id      INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  year    CHAR(4),
  season  CHAR(1)
);

CREATE TABLE user (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email     VARCHAR(320),
  password  CHAR(60),
  firstname VARCHAR(100),
  lastname  VARCHAR(100),
  isAdmin   BOOLEAN DEFAULT false,
  standing  INT DEFAULT 0
);

CREATE TABLE plan (
  id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(500),
  time        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(500),
  isDefault   BOOLEAN DEFAULT false,
  isFavourite BOOLEAN DEFAULT false,
  uid         INT,
  sid         INT,

  FOREIGN KEY (uid)
    REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  
  FOREIGN KEY (sid)
    REFERENCES specialization(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE term (
  id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  number INT,
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
    ON DELETE CASCADE,

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

CREATE TABLE plan_term (
  pid INT,
  tid INT,

  FOREIGN KEY (pid)
    REFERENCES plan(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  FOREIGN KEY (tid)
    REFERENCES term(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  PRIMARY KEY (pid, tid)
);

INSERT INTO course_info (id, credits) VALUES ("ENGL 112", 3);
INSERT INTO course_info (id, credits) VALUES ("ENGL 114", 3);
INSERT INTO course_info (id, credits) VALUES ("ENGL 113", 3);
INSERT INTO course_info (id, credits) VALUES ("ENGL 150", 3);
INSERT INTO course_info (id, credits) VALUES ("ENGL 151", 3);
INSERT INTO course_info (id, credits) VALUES ("ENGL 153", 3);
INSERT INTO course_info (id, credits) VALUES ("MATH 100", 3);
INSERT INTO course_info (id, credits) VALUES ("MATH 101", 3);

INSERT INTO course_info (id, credits) VALUES ("PHYS 111", 3);
INSERT INTO course_info (id, credits) VALUES ("PHYS 112", 3);
INSERT INTO course_info (id, credits) VALUES ("PHYS 102", 3);
INSERT INTO course_info (id, credits) VALUES ("PHYS 121", 3);
INSERT INTO course_info (id, credits) VALUES ("PHYS 122", 3);
INSERT INTO course_info (id, credits) VALUES ("CHEM 111", 3);
INSERT INTO course_info (id, credits) VALUES ("CHEM 121", 3);
INSERT INTO course_info (id, credits) VALUES ("CHEM 113", 3);
INSERT INTO course_info (id, credits) VALUES ("CHEM 123", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 111", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 123", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 121", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 211", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 221", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 222", 3);
INSERT INTO course_info (id, credits) VALUES ("MATH 200", 3);
INSERT INTO course_info (id, credits) VALUES ("MATH 221", 3);
INSERT INTO course_info (id, credits) VALUES ("STAT 230", 3);
INSERT INTO course_info (id, credits, standingRequirement) VALUES ("COSC 304", 3, 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 310", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 320", 3);
INSERT INTO course_info (id, credits) VALUES ("COSC 341", 3);
INSERT INTO course_info (id, credits) VALUES ("PHIL 331", 3);

INSERT INTO course_info_requirement VALUES ("COSC 121", "COSC 111");
INSERT INTO course_info_requirement VALUES ("COSC 222", "COSC 121");
INSERT INTO course_info_requirement VALUES ("COSC 310", "COSC 222");

INSERT INTO session (year, season) VALUES ("2018", "W");
INSERT INTO term (number, sid) VALUES (1, 1);
INSERT INTO degree (name) VALUES ("Test degree");
INSERT INTO specialization (name, did) VALUES ("Test spec", 1);

INSERT INTO user (email, password, firstname, lastname) VALUES ("admin", '$2a$10$J/4uY8XFoIvlvKUsfDJqDOFxJF2KHuEjRMgzcZ.lb.MtHpmEapUBi', "admin", "admin");
INSERT INTO plan (title, isFavourite, description, uid, sid) VALUES ("test plan", true, "test desc", 1, 1);