-- =============================================
-- Author:      Alejandro Miguel Cruz
-- Create Date: 31/08/2024
-- Description: Genera el registro de un hijo
-- =============================================

ALTER PROCEDURE CREATE_CHILD
(
	@_ListChildrenId UNIQUEIDENTIFIER,
	@_PersonId UNIQUEIDENTIFIER,
	@_TreeId UNIQUEIDENTIFIER,
	@_ParentId_1 UNIQUEIDENTIFIER,
	@_ParentId_2 UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON

	INSERT INTO Childrens (
		ChildrenId,
		PersonId,
		ListChildrenId,
		TreeId,
		ParentId_1,
		ParentId_2
	) VALUES (
		NEWID(),
		@_PersonId,
		@_ListChildrenId,
		@_TreeId,
		@_ParentId_1,
		@_ParentId_2
	)
END