CREATE TABLE issues(
   id SERIAL PRIMARY KEY,
   title VARCHAR(150) NOT NULL,
   description TEXT NOT NULL,
   type VARCHAR(20) CHECK(type IN('bug','feature_request')) NOT NULL,
   status VARCHAR(20) DEFAULT 'open' CHECK(status IN('open','in_progress','resolved')),
   reporter_id INT  NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)