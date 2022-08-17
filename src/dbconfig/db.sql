--TABLES
-- Users table
CREATE TABLE users(
    user_id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_first_name VARCHAR(16) NOT NULL,
    user_last_name VARCHAR(16) NOT NULL,
    user_password VARCHAR(60) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Content table
CREATE TABLE contents(
    content_id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content_name VARCHAR(50) NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users Favorites table (many to many relationship)
CREATE TABLE users_favorites(
    user_id INT(11) UNSIGNED NOT NULL,
    content_id INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, content_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (content_id) REFERENCES contents(content_id),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PROCEDURES
-- get all users
DELIMITER //

CREATE PROCEDURE get_users()
  BEGIN
    SELECT * FROM users;
  END//

DELIMITER ;

-- get user by id
DELIMITER //

CREATE PROCEDURE get_user_by_id(IN userId INT(11))
  BEGIN
    SELECT * FROM users WHERE user_id = userId;
  END//

DELIMITER ;

-- get user by email
DELIMITER //

CREATE PROCEDURE get_user_by_email(IN userEmail VARCHAR(50))
  BEGIN
    SELECT * FROM users WHERE user_email = userEmail;
  END//

DELIMITER ;

-- create user
DELIMITER //

CREATE PROCEDURE create_user(IN userFirstName VARCHAR(16), IN userLastName VARCHAR(16), IN userPassword VARCHAR(60), IN userEmail VARCHAR(50))
  BEGIN
    INSERT INTO users(user_first_name, user_last_name, user_password, user_email) VALUES (userFirstName, userLastName, userPassword, userEmail);
  END//

DELIMITER ;

-- save user favorite
DELIMITER //

CREATE PROCEDURE save_user_favorite(IN userId INT(11), contentId INT(11), contentName VARCHAR(50))
  BEGIN
    INSERT INTO users_favorites(user_id, content_id) VALUES (userId, contentId);
  END//

DELIMITER ;

-- get user favorites
DELIMITER //

CREATE PROCEDURE get_user_favorites(IN userId INT(11))
  BEGIN
    SELECT contents.content_id, contents.content_name FROM contents INNER JOIN users_favorites ON contents.content_id = users_favorites.content_id INNER JOIN users ON users.user_id = users_favorites.user_id WHERE users.user_id = userId;
  END//

DELIMITER ;

-- get all content
DELIMITER //

CREATE PROCEDURE get_contents()
  BEGIN
    SELECT * FROM contents;
  END//

DELIMITER ;