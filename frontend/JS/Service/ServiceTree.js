class ServiceTree {
    static #URLAPI = "http://localhost:3000/";
    static #DEFAULT_HEADERS = {
       'Content-Type': 'application/json'
    }
    static #POST = "POST"
    static #GET = "GET"

    static async GetTree() {
        const response = await fetch(this.#URLAPI + "gettree", {
            headers: this.#DEFAULT_HEADERS,
            method: this.#GET
        })

        return await response.json()
    }

    static async AddPerson(_Name) {
        const response = await fetch(this.#URLAPI + "addperson", {
            headers: this.#DEFAULT_HEADERS,
            method: this.#POST,
            body: JSON.stringify({
                Name: _Name
            })
        })

        return await response.json();
    }

    static async GetPersons() {
        const response = await fetch(this.#URLAPI + "getpersons", {
            headers: this.#DEFAULT_HEADERS,
            method: this.#GET
        })

        return await response.json()
    }

    static async AddPartner(_PersonId, _PartnerId) {
        const response = await fetch(this.#URLAPI + "addpartnert", {
            headers: this.#DEFAULT_HEADERS,
            method: this.#POST,
            body: JSON.stringify({
                PersonId: _PersonId,
                ParnertId: _PartnerId
            })
        })

        return await response.json()
    }

    static async AddChild(_ParentId, _ChildId) {
        const response = await fetch(this.#URLAPI + "addchild", {
            headers: this.#DEFAULT_HEADERS,
            method: this.#POST,
            body: JSON.stringify({
                ParentId: _ParentId,
                ChildId: _ChildId
            })
        })

        return await response.json()
    }
}

export default ServiceTree