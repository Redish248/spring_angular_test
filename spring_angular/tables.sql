create table user_project (
    user_id     serial          PRIMARY KEY,
    login       varchar(30)     not null,
    name        varchar(30)     not null ,
    email       varchar(80),
    password    varchar(80)
);