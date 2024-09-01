-- =============================================
-- Author:      Alejandro Miguel Cruz
-- Create Date: 31/08/2024
-- Description: Agrega un hijo a una persona
-- =============================================

ALTER PROCEDURE ADD_CHILD
(
	@_ParentId_1 UNIQUEIDENTIFIER,
	@_ChildId UNIQUEIDENTIFIER,
	@_ParentId_2 UNIQUEIDENTIFIER,
	@_TreeId UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON

	DECLARE
		@_ListChildrenParent_1 UNIQUEIDENTIFIER = NULL,
		@_ListChildrenParent_2 UNIQUEIDENTIFIER = NULL

	SET @_ListChildrenParent_1 = (
		SELECT TOP 1 
			ListChildrenId
		FROM Persons
		WHERE
			PersonId = @_ParentId_1 AND
			TreeId = @_TreeId
	)

	SET @_ListChildrenParent_2 = (
		SELECT TOP 1
			ListChildrenId
		FROM Persons
		WHERE
			PersonId = @_ParentId_2 AND
			TreeId = @_TreeId
	)

	IF (@_ListChildrenParent_1 IS NULL OR @_ListChildrenParent_1 = '')
	BEGIN
		SET @_ListChildrenParent_1 = NEWID()
		EXEC CREATE_LIST_CHILD 
			@_ListChildrenId = @_ListChildrenParent_1,
			@_TreeId = @_TreeId

		UPDATE
			Persons
		SET
			ListChildrenId = @_ListChildrenParent_1
		WHERE
			PersonId = @_ParentId_1 AND
			TreeId = @_TreeId
	END

	IF (@_ListChildrenParent_2 IS NULL OR @_ListChildrenParent_2 = '')
	BEGIN
		SET @_ListChildrenParent_2 = NEWID()
		EXEC CREATE_LIST_CHILD 
			@_ListChildrenId = @_ListChildrenParent_1,
			@_TreeId = @_TreeId

		UPDATE
			Persons
		SET
			ListChildrenId = @_ListChildrenParent_2
		WHERE
			PersonId = @_ParentId_2 AND
			TreeId = @_TreeId
	END


	EXEC CREATE_CHILD
		@_ListChildrenId = @_ListChildrenParent_1,
		@_PersonId = @_ChildId,
		@_TreeId = @_TreeId,
		@_ParentId_1 = @_ParentId_1,
		@_ParentId_2 = @_ParentId_2

	EXEC CREATE_CHILD
		@_ListChildrenId = @_ListChildrenParent_2,
		@_PersonId = @_ChildId,
		@_TreeId = @_TreeId,
		@_ParentId_1 = @_ParentId_1,
		@_ParentId_2 = @_ParentId_2

	UPDATE
		Persons
	SET
		HasParents = 1
	WHERE
		PersonId = @_ChildId AND
		TreeId = @_TreeId

	SELECT 'Hijo agregado con éxito' MSG
END