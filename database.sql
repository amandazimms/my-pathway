
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
    incident_count integer
);


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

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    event_name character varying,
    test_id integer REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE,
    proctor_id integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    event_date date,
    event_time time without time zone,
    event_end_time time without time zone,
    url character varying,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    last_modified_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_modified_by integer REFERENCES "user"(id) ON DELETE SET NULL ON UPDATE CASCADE
);
