CREATE TABLE users (
    user_id SERIAL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE movies (
    movie_id SERIAL,
    title VARCHAR(100) NOT NULL,
    path VARCHAR(100) NOT NULL,
    PRIMARY KEY (movie_id)
);

CREATE TABLE likes (
    like_id SERIAL,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (like_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

INSERT INTO public."Users" ("Name" , "Email", "Password" ) VALUES ('John Smith', 'admin@gmail.com', 'password');