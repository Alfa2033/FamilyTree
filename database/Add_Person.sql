-- =============================================
-- Author:      Alejandro Miguel Cruz
-- Create Date: 31/08/2024
-- Description: Agrega una persona a la lista de personas
-- =============================================

CREATE PROCEDURE ADD_PERSON
(
	@_PersonId UNIQUEIDENTIFIER,
	@_TreeId UNIQUEIDENTIFIER,
	@_Name VARCHAR(250)
)
AS
BEGIN
	SET NOCOUNT ON
	INSERT INTO Persons (
		PersonId,
		TreeId,
		NamePerson,
		HasParents
	) 
	VALUES (
		@_PersonId,
		@_TreeId,
		@_Name,
		0
	)

	SELECT 'Persona agregada con éxito' MSG
END