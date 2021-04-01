CREATE DATABASE onlookers_app;

-- connect to the db! thanks emil!

DROP TABLE users CASCADE;
DROP TABLE reports CASCADE;
DROP TABLE log_entries;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    report_name TEXT,
    date TEXT,
    user_id INT NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE log_entries (
    id SERIAL PRIMARY KEY,
    report_id INT,
    content TEXT,
    timestamp TIMESTAMPTZ DEFAULT now(),
    longitude TEXT,
    latitude TEXT,
    CONSTRAINT fk_report FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);


INSERT INTO users (username, email, password) VALUES ('dummy user', 'dummy@user.com', 'fakepassword');

INSERT INTO reports (report_name, date, user_id) VALUES ('dummy report name', '29/03/2021', '1');

INSERT INTO log_entries (report_id, content, longitude, latitude) VALUES ('1', 'Lorem ipsum dolor sit amet', '-27.444035119267646', '153.02748981956103');









-- CREATE TABLE media ( 
--     id SERIAL PRIMARY KEY,
--     report_id INT,
--     timestamp  TIMESTAMPTZ,
--     CONSTRAINT fk_report FOREIGN KEY (report_id) REFERENCES reports(id)
-- );