
CREATE TABLE users (
    id SERIAL PRIMARY KEY,        
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, email, password)
VALUES 
('2','John Doe', 'johndoe@example.com', 'password123'),
('3','Jane Smith', 'janesmith@example.com', 'password123'),
('4','Alice Johnson', 'alicejohnson@example.com', 'password123'),
('5','Bob Brown', 'bobbrown@example.com', 'password123'),
('6','Charlie Davis', 'charliedavis@example.com', 'password123'),
('7','Emily Clark', 'emilyclark@example.com', 'password123'),
('8','Frank Harris', 'frankharris@example.com', 'password123'),
('9','Grace Evans', 'graceevans@example.com', 'password123'),
('10','Henry White', 'henrywhite@example.com', 'password123'),
('11','Isabella Lee', 'isabellalee@example.com', 'password123');


CREATE TABLE theatres (
    id SERIAL PRIMARY KEY,        
    theatre_name VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE booked_tickets (
    id SERIAL PRIMARY KEY,               
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL CHECK (total_seats > 0), 
    seat_number JSONB NOT NULL,          
    show_time TEXT NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL CHECK (amount_paid >= 0), 
    theatre_name VARCHAR(255) NOT NULL,            
    imdb_id VARCHAR(20) NOT NULL,       
    movie_name VARCHAR(255) NOT NULL,     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE booked_tickets
ADD CONSTRAINT fk_user_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE;

ALTER TABLE booked_tickets
ADD CONSTRAINT fk_theatre_name FOREIGN KEY (theatre_name) REFERENCES theatres(theatre_name) ON DELETE CASCADE;



