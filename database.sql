
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name character varying,
    last_name character varying,
    address_one character varying,
    address_two character varying,
    city character varying,
    state character varying,
    zip_code character varying,
    role character varying,
    username character varying,
    password character varying,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    profile_picture character varying
);

INSERT INTO "user" ("first_name", "last_name", "address_one", "address_two", "city", "state", "zip_code", "role", "username")
VALUES ('Mario', 'Usuario', '777 Park Ave', 'Apt. 1101', 'NYC', 'NY', '10001', 'STUDENT', 'musuar@prime.com'),
('Doug', 'Dimmadome', '444 Dimmsdale Dimmadome', 'Ste. 10', 'Dimmsdale', 'DM', '19327', 'STUDENT', 'ddimma@prime.com'), 
('First', 'Last', '603 Hoyabembe St', 'Apt. 3', 'Fake City', 'FC', '00002', 'STUDENT', 'flast@prime.com') 


CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    title character varying,
    points_possible integer,
    test_time_limit integer,
    question_shuffle boolean,
    test_attempt_limit integer,
    created_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_modified_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    last_modified_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    published boolean
);

INSERT INTO "test" ("title", "points_possible")
VALUES ('Example Test',100), ('Math Test', 100), ('Geography', 100);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    parent_test_id integer REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE,
    point_value integer,
    type character varying,
    required boolean,
    question character varying,
    option_one character varying,
    option_two character varying,
    option_three character varying,
    option_four character varying,
    option_five character varying,
    option_six character varying,
    answer character varying,
    created_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_modified_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    last_modified_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    active boolean
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

CREATE TABLE exam (
    id SERIAL PRIMARY KEY,
    event_id integer REFERENCES event(id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_id integer REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    incident integer,
    score integer,
    pass character varying,
    exam_time_start timestamp without time zone,
    status character varying,
    active_question_id integer REFERENCES question(id) ON DELETE CASCADE ON UPDATE CASCADE,
    exam_time_end timestamp without time zone,
    created_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_modified_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    last_modified_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    face_image character varying,
    id_image character varying,
    id_confirmed boolean,
    present boolean,
    help boolean,
    privacy_terms boolean
);

INSERT INTO "exam" ("id","incident", "score", "pass", "present")
VALUES (111, 2, 88, 'TRUE', 'TRUE'),
(112, 7, 58, 'FALSE', 'TRUE'),
(113, 0, 0, 'FALSE', 'FALSE'),
(114, 2, 93, 'TRUE', 'TRUE')

CREATE TABLE message_session (
    id SERIAL PRIMARY KEY,
    exam_id integer REFERENCES exam(id) ON DELETE CASCADE ON UPDATE CASCADE,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "message_session" ("id", "exam_id")
VALUES (990, 111), (991, 112), (992, 113), (993, 114);

CREATE TABLE message_detail (
    id SERIAL PRIMARY KEY,
    message_session_id integer REFERENCES message_session(id) ON DELETE CASCADE ON UPDATE CASCADE,
    creator_id integer REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    message character varying,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "message_detail" ("message_session_id", "message")
VALUES (990, 'I need help.'), (991, 'How can I help?'), (992, 'OK'), (993, 'Please share your screen.');

CREATE TABLE exam_detail (
    id SERIAL PRIMARY KEY,
    exam_id integer REFERENCES exam(id) ON DELETE CASCADE ON UPDATE CASCADE,
    question_id integer REFERENCES question(id) ON DELETE CASCADE ON UPDATE CASCADE,
    selected_answer character varying,
    correct boolean,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    incident_count integer
);

INSERT INTO "exam_detail" ("exam_id", "selected_answer", "correct")
VALUES (111, 'Answer 1', 'FALSE'), (112, 'Answer 2', 'TRUE'), (113, 'Answer 3', 'FALSE'), (114, 'Answer 4', 'TRUE');

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    event_name character varying,
    test_id integer REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE,
    proctor_id integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    url character varying,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    last_modified_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_modified_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    event_date_start timestamp without time zone,
    event_date_end timestamp without time zone
);


INSERT INTO "event" ("event_name", "url")
VALUES ('Eventicle', 'https://www.primeacademy.io/'),
('Main Event', 'https://www.google.com/'),
('Former Event', 'https://www.amazon.com/'),
('Current Events', 'https://www.wsj.com/')