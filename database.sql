DROP TABLE IF EXISTS course_term;
DROP TABLE IF EXISTS course_requirement;
DROP TABLE IF EXISTS course_corequirement;
DROP TABLE IF EXISTS specialization_course;
DROP TABLE IF EXISTS plan_course;
DROP TABLE IF EXISTS credit_requirement;
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS term;
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
  id      INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  credits INT,
  courses VARCHAR(1000),
  spid    INT,

  FOREIGN KEY (spid)
    REFERENCES specialization(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE session (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  startYear CHAR(4),
  season    CHAR(1)
);

CREATE TABLE user (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email     VARCHAR(320),
  password  VARCHAR(40),
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
-- maybe should be credit req instead of specialization
CREATE TABLE specialization_course_info (
  spid INT,
  cid VARCHAR(9),

  FOREIGN KEY (spid)
    REFERENCES specialization(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (cid)
    REFERENCES course_info(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
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
    ON DELETE NO ACTION
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
    ON DELETE NO ACTION
);

CREATE TABLE course_term (
  cid INT,
  sid INT,

  FOREIGN KEY (cid)
    REFERENCES course(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

  FOREIGN KEY (sid)
    REFERENCES term(id)
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);
