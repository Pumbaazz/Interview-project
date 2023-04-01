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

INSERT INTO public."Users" ("Name" , "Email", "Password" ) VALUES ('John Smith', 'admin@gmail.com', 'password');

INSERT INTO public."Movies"("Title","Path") VALUES
 ('The Shawshank Redemption','https://www.imdb.com/title/tt0111161/mediaviewer/rm1644259072/')
,('The Godfather','https://www.imdb.com/title/tt0068646/mediaviewer/rm2979155456/')
,('The Dark Knight','https://www.imdb.com/title/tt0468569/mediaviewer/rm3879834624/');