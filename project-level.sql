drop database if exists projectdb;
create database projectdb;
use projectdb;
create table users (
	id int auto_increment primary key,
    username varchar(50),
    email varchar(100)
);