CREATE TABLE trucks (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255),
    model VARCHAR(255),
    license VARCHAR(255),
    status VARCHAR(255),
    isfavorite BOOLEAN,
    picture VARCHAR(255)
);



create TABLE workers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),  
    status VARCHAR(255),
);

create TABLE admins(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),  
    status VARCHAR(255),
    picture VARCHAR(255),
    isfavorite BOOLEAN,
    password VARCHAR(255)
);


create TABLE units(
    id SERIAL PRIMARY KEY,
    truck_id INTEGER,
    worker_id INTEGER,
    FOREIGN KEY (truck_id) REFERENCES trucks(id)
    FOREIGN KEY (worker_id) REFERENCES workers(id)

);