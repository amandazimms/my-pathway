
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

INSERT INTO "user" ("id", "first_name", "last_name", "address_one", "city", "state", "zip_code", "role", "username")
VALUES (2, 'Student', 'User', '777 Park Ave', 'NYC', 'NY', '10001', 'STUDENT', 'suser@prime.com'),
(3, 'Proctor', 'User', '1000 Holt Ave', 'Winter Park', 'FL', '32789', 'PROCTOR', 'puser@prime.com')


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

INSERT INTO "test" ("id", "title", "points_possible")
VALUES (1,'Peer Recovery Specialist Certification', 100), (2,'Certified Clinical Supervisor Reciprocal', 100), (3,'Certified Prevention Professional', 100), (4,'Advanced Alcohol and Drug Counselor Reciprocal', 100);


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

INSERT INTO "question" ("id", "parent_test_id", "point_value", "question", "option_one", "option_two", "option_three", "option_four", "answer")
VALUES (1, 1, 4, 'Advocacy is intended to:', 'Provide education to peers/consumers', 'Support and find appropriate employement for peers/consumers', 'Provide housing and shelter for peers/consumers.', 'Promote the dignity and reduction of stigma against peers/consumers', 'Promote the dignity and reduction of stigma against peers/consumers'),
(2, 1, 4, 'What are SAMHSA s four major dimensions of recovery?', ' Health, Home, Treatment and Case Management', 'Community, Purpose, Case Management and Care', 'Health, Home, Purpose, and Community', 'Community, Care, Treatment and Case Management', 'Health, Home, Purpose, and Community'), 
(3, 1, 4, 'A benefit of sharing your recovery story is to:', 'Support change, and show recovery is possible', 'Create expectations', 'Show the best way toward recovery', 'Create a plan for a recovery process', 'Support change, and show recovery is possible'), 
(4, 1, 4, 'An example of a recovery-oriented approach is?', 'Promoting professionals as main access to information', 'Focusing on wellness, ability and choice', 'Promoting clinical stability to manage illness', 'Focusing on deficits', 'Focusing on wellness, ability and choice')


CREATE TABLE exam (
    id SERIAL PRIMARY KEY,
    event_id integer REFERENCES event(id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_id integer REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    incident integer DEFAULT 0,
    score integer,
    pass character varying,
    exam_time_start timestamp without time zone,
    status character varying DEFAULT 'AWAITING APPROVAL'::character varying,
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

INSERT INTO "exam" ("id", "event_id", "student_id", "incident", "score", "pass", "exam_time_start", "exam_time_end", "id_confirmed", "present", "privacy_terms")
VALUES (1, 1, 2, 0, 100, 'TRUE', '2022-01-26 12:00:00.000000', '2022-01-26 13:00:00.000000', 'TRUE', 'TRUE', 'TRUE')


CREATE TABLE message_session (
    id SERIAL PRIMARY KEY,
    exam_id integer REFERENCES exam(id) ON DELETE CASCADE ON UPDATE CASCADE,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE message_detail (
    id SERIAL PRIMARY KEY,
    message_session_id integer REFERENCES message_session(id) ON DELETE CASCADE ON UPDATE CASCADE,
    creator_id integer REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    message character varying,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE exam_detail (
    id SERIAL PRIMARY KEY,
    exam_id integer REFERENCES exam(id) ON DELETE CASCADE ON UPDATE CASCADE,
    question_id integer REFERENCES question(id) ON DELETE CASCADE ON UPDATE CASCADE,
    selected_answer character varying,
    correct boolean,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    incident_count integer DEFAULT 0
);


INSERT INTO "exam_detail" ("id", "exam_id", "question_id", "selected_answer", "correct")
VALUES (1, 1, 1, 'Promote the dignity and reduction of stigma against peers/consumers', 'TRUE'), (2, 1, 2, 'Health, Home, Purpose, and Community', 'TRUE'), (3, 1, 3, 'Support change, and show recovery is possible', 'TRUE'), (4, 1, 4, 'Focusing on wellness, ability and choice', 'TRUE') 

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


INSERT INTO "event" ("id", "event_name", "test_id", "proctor_id", "event_date_start", "event_date_end")
VALUES (1, 'Former Event', 1, 3, '2022-01-26 12:00:00.000000', '2022-01-26 13:00:00.000000'),
(2, 'Current Event', 1, 3, '2022-02-22 11:00:00.000000', '2022-02-22 14:00:00.000000'),
(3, 'Future Event', 1, 3, '2022-03-22 11:00:00.000000', '2022-03-22 14:00:00.000000')
