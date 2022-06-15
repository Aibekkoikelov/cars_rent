

create TABLE cars (
  id SERIAL   PRIMARY KEY ,
  model TEXT,
  registerNumber INTEGER,
  status BOOLEAN
);

create TABLE client (
  id SERIAL  PRIMARY KEY ,
  name TEXT,
  age INTEGER,
  phoneNumber INTEGER)

create TABLE reservation (
    id SERIAL INTEGER PRIMARY KEY ,
    clientId INTEGER,
    carId INTEGER,
    startDate DATE,
    endDate DATE,
    FOREIGN KEY(clientId) REFERENCES client(id),
    FOREIGN KEY(carId) REFERENCES cars(id))