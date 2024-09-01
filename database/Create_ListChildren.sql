-- =============================================
-- Author:      Alejandro Miguel Cruz
-- Create Date: 31/08/2024
-- Description: Genera una lista de hijos
-- =============================================

CREATE PROCEDURE CREATE_LIST_CHILD
(
	@_ListChildrenId UNIQUEIDENTIFIER,
	@_TreeId UNIQUEIDENTIFIER
)
AS
BEGIN
	INSERT INTO ListChildrens (
		ListChildrenId,
		TreeId
	) VALUES (
		@_ListChildrenId,
		@_TreeId
	)
END