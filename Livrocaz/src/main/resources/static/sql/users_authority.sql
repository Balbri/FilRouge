create table users(
	username varchar(50) not null primary key,
	password varchar(255) not null,
	enabled boolean not null);

create table authorities (
	username varchar(50) not null,
	authority varchar(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username));

create unique index ix_auth_username on authorities (username,authority);

insert into users(username,password,enabled) values ('dbinscrit','{bcrypt}$2a$04$3oa5XGzGArd2DnRv3.ax7OxGxnvCisSuWWGxYM2xNE99UFLCgQXYS', true);
insert into users(username,password,enabled) values ('dbgestionnaire','{bcrypt}$2a$04$CZsnHi2Jg/Z0dmBWEE3BKehk9MkLQsQAMtVgsepayT1WdIEx5GTIq', true);
insert into users(username,password,enabled) values ('dbadmin','{bcrypt}$2a$04$L81ltvjTKE57lMNPMC3TQeDAPtTBmoxcclRsfDVt.u7uUCHHLSmMO', true);

INSERT INTO authorities (username, authority)VALUES ('dbinscrit', 'INSCRIT');
INSERT INTO authorities (username, authority)VALUES ('dbgestionnaire', 'GESTIONNAIRE');
INSERT INTO authorities (username, authority)VALUES ('dbadmin', 'ADMIN');