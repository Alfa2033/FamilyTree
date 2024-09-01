CREATE TABLE Trees (
	TreeId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL
)

CREATE TABLE Persons (
	PersonId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	TreeId UNIQUEIDENTIFIER NOT NULL,
	NamePerson VARCHAR(250) NOT NULL,
	PartnerId UNIQUEIDENTIFIER NULL,
	HasParents TINYINT NULL,
	ListChildrenId UNIQUEIDENTIFIER NULL
)

CREATE TABLE Childrens (
	ChildrenId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	PersonId UNIQUEIDENTIFIER NOT NULL,
	ListChildrenId UNIQUEIDENTIFIER NOT NULL,
	TreeId UNIQUEIDENTIFIER NOT NULL,
	ParentId_1 UNIQUEIDENTIFIER NOT NULL,
	ParentId_2 UNIQUEIDENTIFIER NOT NULL,
)

CREATE TABLE ListChildrens (
	ListChildrenId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	TreeId UNIQUEIDENTIFIER NOT NULL
)

SELECT * FROM Trees
SELECT * FROM Persons
SELECT * FROM Childrens
SELECT * FROM ListChildrens