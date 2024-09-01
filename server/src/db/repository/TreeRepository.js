const configSQL = require('../config/database')
const { Response, sql, StoreProcedures } = require('../../dependencies/Dependencies')

class TreeRepository {
    static #pool = new sql.ConnectionPool(configSQL)

    static async CreateTree(_TreeId) {
        const connection = await this.#pool.connect()
        if (connection.connected) {
            const request = new sql.Request(this.#pool)
            request.input("_TreeId", sql.UniqueIdentifier, _TreeId)
            request.execute(StoreProcedures.ADD_TREE)
        }
    }

    static async CreatePerson(_TreeId, _PersonId, _Name) {
        const response = new Response()
        const connection = await this.#pool.connect()
        if (connection.connected) {
            const request = new sql.Request(this.#pool)
            request.input("_PersonId", sql.UniqueIdentifier, _PersonId)
            request.input("_TreeId", sql.UniqueIdentifier, _TreeId)
            request.input("_Name", sql.VarChar, _Name)
            const result = await request.execute(StoreProcedures.ADD_PERSON)
            console.log(result)
            if (result.recordset.length > 0) {
                response.IsOk = true
            }
        }

        return response
    }

    static async AddPartner(_TreeId, _PersonId, _PartnerId) {
        const response = new Response()
        const connection = await this.#pool.connect()
        if(connection.connected) {
            const request = new sql.Request(this.#pool)
            request.input("_TreeId", sql.UniqueIdentifier, _TreeId)
            request.input("_PersonId", sql.UniqueIdentifier, _PersonId)
            request.input("_PartnerId", sql.UniqueIdentifier, _PartnerId)
            const result = await request.execute(StoreProcedures.ADD_PARTNER)
            console.log(result)
            if (result.recordset.length > 0) {
                response.IsOk = true
            }
        }

        return response
    }

    static async AddChild({ _TreeId, _Parent1, _Parent2, _ChildId }) {
        const response = new Response()
        const connection = await this.#pool.connect()
        if(connection.connected) {
            const request = new sql.Request(this.#pool)
            request.input("_TreeId", sql.UniqueIdentifier, _TreeId)
            request.input("_ChildId", sql.UniqueIdentifier, _ChildId)
            request.input("_ParentId_1", sql.UniqueIdentifier, _Parent1)
            request.input("_ParentId_2", sql.UniqueIdentifier, _Parent2)
            const result = await request.execute(StoreProcedures.ADD_CHILD)
            console.log(result)
            if (result.recordset.length > 0) {
                response.IsOk = true
            }
        }

        return response
    }
}

module.exports = TreeRepository;