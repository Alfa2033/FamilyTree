-- =============================================
-- Author:      Alejandro Miguel Cruz
-- Create Date: 31/08/2024
-- Description: Agrega una pareja a la persona indicada
-- =============================================

CREATE PROCEDURE ADD_PARTNER
(
	@_PersonId UNIQUEIDENTIFIER,
	@_TreeId UNIQUEIDENTIFIER,
	@_PartnerId UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON

	UPDATE Persons
	SET
		PartnerId = @_PartnerId
	WHERE
		PersonId = @_PersonId AND
		TreeId = @_TreeId

	UPDATE Persons
	SET
		PartnerId = @_PersonId
	WHERE
		PersonId = @_PartnerId AND
		TreeId = @_TreeId
	
	SELECT 'Pareja agregada con éxito' MSG
END