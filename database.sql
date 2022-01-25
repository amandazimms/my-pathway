
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
  "id" serial,
  "first_name" varchar,
  "last_name" varchar,
  "address_one" varchar,
  "address_two" varchar,
  "city" varchar,
  "state" varchar,
  "zip_code" varchar,
  "role" varchar,
  "username" varchar,
  "password" varchar,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "profile_picture" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "test" (
  "id" serial,
  "title" varchar,
  "points_possible" integer,
  "test_time_limit" integer,
  "question_shuffle" boolean,
  "test_attempt_limit" integer,
  "created_by" integer,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" integer,
  "last_modified_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_test.created_by"
    FOREIGN KEY ("created_by")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_test.last_modified_by"
    FOREIGN KEY ("last_modified_by")
      REFERENCES "user"("id")
);

INSERT INTO "test" ("title", "points_possible")
VALUES ('Example Test',100), ('Math Test', 100), ('Geography', 100);

CREATE TABLE "question" (
  "id" serial,
  "parent_test_id" integer,
  "point_value" integer,
  "type" varchar,
  "required" boolean,
  "question" varchar,
  "option_one" varchar,
  "option_two" varchar,
  "option_three" varchar,
  "option_four" varchar,
  "option_five" varchar,
  "option_six" varchar,
  "answer" varchar,
  "status" varchar,
  "created_by" integer,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" integer,
  "last_modified_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_question.parent_test_id"
    FOREIGN KEY ("parent_test_id")
      REFERENCES "test"("id"),
  CONSTRAINT "FK_question.last_modified_by"
    FOREIGN KEY ("last_modified_by")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_question.created_by"
    FOREIGN KEY ("created_by")
      REFERENCES "user"("id")
);

INSERT INTO "question" ("parent_test_id", "question", "option_one", "option_two", "option_three", "option_four", "option_five", "option_six", "answer")
VALUES (1, 'Amanda last name?', 'Zimaman', 'Cinnamon', 'Simmering', 'Zimmerman', 'Zimmermann', 'Zeppelin', 'Zimmerman'),
(1, 'Chris last name?', 'Spiess', 'Cunningham', 'Zimmerman', 'Nelson', 'Topher', 'Nilson', 'Nelson'), 
(1, 'Jackie last name?', 'Spiess', 'Cunningham', 'Zimmerman', 'Nelson', 'Spies', 'Obama', 'Spiess'), 
(1, 'How do you spell Cunningham first name', 'Nicholas', 'Nicolas', 'Nicole', 'Nickolas', 'Niklaus', 'Nicolai', 'Nickolas'),
(2, '2+2?', 4, 5, 6, 8, 1, 10, 4),
(2, '3+8?', 4, 5, 6, 8, 11, 10, 11),
(2, '8x8', 45, 56, 64, 88, 16, 62, 64),
(3, 'Capital of Italy?', 'Rigatoni', 'Rome', 'Florence', 'Milan', 'Venice', 'Naples', 'Rome'),
(3, 'Capital of Peru?', 'Llama', 'Lima', 'Cusco', 'Machu Picchu', 'Madrid', 'Nazca', 'Lima'),
(3, 'Capital of Ghana?', 'Lagos', 'Accra', 'Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Accra'),
(2, '77 x 77 ?', 4987, 7777, 6013, 5929, 6239, 'idk', 5927);



CREATE TABLE "event" (
  "id" serial,
  "event_name" varchar,
  "test_id" integer,
  "proctor_id" integer,
  "event_date" date,
  "event_time" timestamp without time zone ,
  "event_end_time" timestamp without time zone ,
  "url" varchar,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "created_by" integer,
  "last_modified_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_event.last_modified_by"
    FOREIGN KEY ("last_modified_by")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_event.proctor_id"
    FOREIGN KEY ("proctor_id")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_event.test_id"
    FOREIGN KEY ("test_id")
      REFERENCES "test"("id"),
  CONSTRAINT "FK_event.created_by"
    FOREIGN KEY ("created_by")
      REFERENCES "user"("id")
);

CREATE TABLE "exam" (
  "id" serial,
  "event_id" integer,
  "student_id" integer,
  "incident" integer,
  "score" integer,
  "pass" varchar,
  "exam_time_start" timestamp without time zone,
  "status" varchar,
  "active_question_id" integer,
  "exam_time_end" timestamp without time zone,
  "created_by" integer,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" integer,
  "last_modified_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "face_image" varchar,
  "id_image" varchar,
  "id_confirmed" boolean,
  "present" boolean,
  "help" boolean,
  "privacy_terms" boolean,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_exam.student_id"
    FOREIGN KEY ("student_id")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_exam.last_modified_by"
    FOREIGN KEY ("last_modified_by")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_exam.event_id"
    FOREIGN KEY ("event_id")
      REFERENCES "event"("id"),
  CONSTRAINT "FK_exam.active_question_id"
    FOREIGN KEY ("active_question_id")
      REFERENCES "question"("id"),
  CONSTRAINT "FK_exam.created_by"
    FOREIGN KEY ("created_by")
      REFERENCES "user"("id")
);

CREATE TABLE "exam_detail" (
  "id" serial,
  "exam_id" integer,
  "question_id" integer,
  "selected_answer" varchar,
  "correct" boolean,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "incident_count" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_exam_detail.question_id"
    FOREIGN KEY ("question_id")
      REFERENCES "question"("id"),
  CONSTRAINT "FK_exam_detail.exam_id"
    FOREIGN KEY ("exam_id")
      REFERENCES "exam"("id")
);

CREATE TABLE "message_session" (
  "id" serial,
  "exam_id" integer,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "created_by" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_message_session.created_by"
    FOREIGN KEY ("created_by")
      REFERENCES "user"("id"),
  CONSTRAINT "FK_message_session.exam_id"
    FOREIGN KEY ("exam_id")
      REFERENCES "exam"("id")
);

CREATE TABLE "message_detail" (
  "id" serial,
  "message_session_id" integer,
  "creator_id" integer,
  "message" varchar,
  "create_date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_message_detail.message_session_id"
    FOREIGN KEY ("message_session_id")
      REFERENCES "message_session"("id"),
  CONSTRAINT "FK_message_detail.creator_id"
    FOREIGN KEY ("creator_id")
      REFERENCES "user"("id")
);