class ServerConstants {
    static SERVER_START_SUCCESSFUL = 'El servidor ha iniciado con éxito'
    static INVALID_MODEL = "La persona indicada es incorrecta"

    static ADD_PERSON_OK = "Persona agregada con éxito"
    static ADD_CHILD_OK = "Hijo agregado con éxito";
    static ADD_PARTNER_OK = "Pareja agregada con éxito";
    static DELETE_PERSON_OK = "La persona ha sido eliminada con éxito"
    
    static NOT_EXIST_PERSON = -1;
    static EXIST_PARTNER = "ya tiene pareja"
    static EXIST_CHILD = "El hijo ya existe"

    static MESSAGE_GENERAL_ERROR = "Ocurrió un error durante la operación, intente nuevamente"
    static MESSAGE_PARENTS_COMPLETE = "ya tiene ambos padres por lo que no se puede agregar otro"
    static MESSAGE_INVALID_CHILD = "Se necesitan ambos padres para tener un hijo"
    static MESSAGE_INVALID_PARTNER = "Un padre no puede tener de pareja a su hijo"
    static MESSAGE_NEED_NAME = "El nombre de la persona es obligatoria"
    static MESSAGE_NOT_EXIST_PERSON = "La persona indicada no existe"
    static MESSAGE_SAME_PERSONS = "Las personas que se intentan agregar son iguales"

    static MESSAGE_ERROR_REPOSITORY = "Ocurrió un error al agregar a la persona indicada, intente nuevamente"

    static METHOD_POST = "POST"
    static METHOD_GET = "GET"
}

module.exports = ServerConstants