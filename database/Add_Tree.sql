-- =============================================
-- Author:      Alejandro Miguel Cruz
-- Create Date: 31/08/2024
-- Description: Genera el identificador de un arbol
-- =============================================

CREATE PROCEDURE CREATE_TREE
(
	@_TreeId UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON
	INSERT INTO Trees (TreeId) VALUES (@_TreeId)
END