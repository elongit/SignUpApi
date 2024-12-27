# Instruction 

# --- create a table in phpAdmine -- 
CREATE TABLE signin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

# ----- signUp RestApi located in server folder ------

