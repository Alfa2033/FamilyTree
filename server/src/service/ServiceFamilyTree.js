const Tree = require('../db/models/Tree')
const Person = require('../db/models/Person')
const TreeRepository = require('../db/repository/TreeRepository')
const { Response, ServerConstants, uuid } = require('../dependencies/Dependencies');

class ServiceFamilyTree {
    #contentTree = "";
    constructor() {
        this.TreeId = uuid.v4()
        this.FamilyTree = new Tree();
        TreeRepository.CreateTree(this.TreeId)
        console.log(`Arbol creado con éxito, identificador del arbol: ${this.TreeId}`)
    }

    async AddPerson(_Name) {
        const response = new Response()

        try {
            if (_Name == "" || _Name == undefined) {
                response.MessageOperation = ServerConstants.MESSAGE_NEED_NAME
                return response;
            }

            const personId = uuid.v4()
            const resultRepository = await TreeRepository.CreatePerson(this.TreeId, personId, _Name)

            if (!resultRepository.IsOk) {
                response.MessageOperation = ServerConstants.MESSAGE_ERROR_REPOSITORY
                return response
            }

            const person = new Person(_Name, personId)
            this.FamilyTree.Persons.push(person)
            response.IsOk = true;
            response.MessageOperation = ServerConstants.ADD_PERSON_OK
            response.Content = {
                Id: person.Id,
                Name: person.Name
            }
        }
        catch (error) {
            response.MessageOperation = ServerConstants.MESSAGE_GENERAL_ERROR
            console.error(error)
        }

        return response;
    }

    RemovePerson(_PersonId) {
        const response = new Response()
        try {
            const indexPerson = this.FamilyTree.Persons.findIndex((person) => person.Id == _PersonId)

            if (indexPerson == ServerConstants.NOT_EXIST_PERSON) {
                response.MessageOperation = ServerConstants.MESSAGE_NOT_EXIST_PERSON
                return response
            }

            this.#FindPersonToRemove(_PersonId)
            this.FamilyTree.Persons.splice(indexPerson, 1)
            response.MessageOperation = ServerConstants.DELETE_PERSON_OK
            response.IsOk = true
        }
        catch (error) {
            response.MessageOperation = ServerConstants.MESSAGE_GENERAL_ERROR
            console.error(error)
        }
        return response
    }

    async SetPartner(_PersonId, _PartnerId) {
        const response = new Response()
        try {
            const person = this.FamilyTree.Persons.find((person) => person.Id == _PersonId)
            const partner = this.FamilyTree.Persons.find((person) => person.Id == _PartnerId)

            if (!person || !partner) {
                response.MessageOperation = ServerConstants.MESSAGE_NOT_EXIST_PERSON
                return response;
            }

            if (person.Id == partner.Id) {
                response.MessageOperation = ServerConstants.MESSAGE_SAME_PERSONS
                return response;
            }

            const responseAdd = person.AddPartner(partner)
            if (responseAdd.IsOk) {
                const resultRepository = await TreeRepository.AddPartner(this.TreeId, _PersonId, _PartnerId)
                if (!resultRepository.IsOk) {
                    response.MessageOperation = ServerConstants.MESSAGE_ERROR_REPOSITORY
                    return response
                }

                return responseAdd
            }
        } catch (error) {
            response.MessageOperation = ServerConstants.MESSAGE_GENERAL_ERROR
            console.error(error)
        }

        return response
    }

    async AddChild(_ParentId, _ChildId) {
        const response = new Response()
        try {
            const parent = this.FamilyTree.Persons.find((person) => person.Id == _ParentId)
            const child = this.FamilyTree.Persons.find((person) => person.Id == _ChildId)

            if (!parent || !child) {
                response.MessageOperation = ServerConstants.MESSAGE_NOT_EXIST_PERSON
                return response
            }

            if (parent.Id == child.Id) {
                response.MessageOperation = ServerConstants.MESSAGE_SAME_PERSONS
                return response
            }

            if (child.Partner?.Id == parent.Id) {
                response.MessageOperation = ServerConstants.MESSAGE_INVALID_PARTNER
                return response;
            }

            if (!(parent.Partner instanceof Person)) {
                response.MessageOperation = ServerConstants.MESSAGE_INVALID_CHILD
                return response
            }

            if (child.ParentsComplete) {
                response.MessageOperation = child.Name + " " + ServerConstants.MESSAGE_PARENTS_COMPLETE
                return response
            }

            const addChildToParent = parent.AddChildren(child)
            const addChildToPartner = parent.Partner.AddChildren(child)

            if (!addChildToParent.IsOk || !addChildToPartner.IsOk) {
                response.MessageOperation = ServerConstants.MESSAGE_INVALID_CHILD
                return response
            }

            const resultRepository = await TreeRepository.AddChild({
                _ChildId: _ChildId,
                _Parent1: parent.Id,
                _TreeId: this.TreeId,
                _Parent2: parent.Partner.Id
            })

            if (resultRepository.IsOk) {
                child.ParentsComplete = true;
                response.IsOk = true
                response.MessageOperation = ServerConstants.ADD_CHILD_OK
            } else{
                response.MessageOperation = ServerConstants.MESSAGE_ERROR_REPOSITORY
            }
        } catch (error) {
            response.MessageOperation = ServerConstants.MESSAGE_GENERAL_ERROR
            console.error(error)
        }

        return response
    }

    GetTree() {
        this.#contentTree = "";
        const mapPersons = new Map()
        const response = new Response()
        for (const person of this.FamilyTree.Persons) {
            if (person.ParentsComplete == false) {
                this.#PrintPerson(person, mapPersons)
            }
        }

        console.log(this.#contentTree)
        response.IsOk = true
        response.Content = this.#contentTree
        return response
    }

    GetPersons() {
        const response = new Response()
        response.IsOk = true;
        response.Content = this.FamilyTree.Persons.map((person) => { return { Name: person.Name, Id: person.Id } })
        return response
    }

    #PrintPerson(person, mapPersons, deep = 0) {
        if (mapPersons.has(person.Id)) {
            return
        }

        mapPersons.set(person.Id, person)
        const indent = "-".repeat(deep * 4);
        this.#contentTree += `${indent} ${person.Name} - ID: ${person.Id}\n`

        if (person.Partner) {
            mapPersons.set(person.Partner.Id, person.Partner)
            this.#contentTree += `${indent} Pareja: ${person.Partner.Name} - ID: ${person.Partner.Id}\n`
        }

        if (person.Children.length > 0) {
            this.#contentTree += "Lista de Hijos: \n"
            for (const child of person.Children) {
                this.#PrintPerson(child, mapPersons, deep + 1)
            }
        }
    }

    #FindPersonToRemove(_PersonId) {
        const personToRemove = this.FamilyTree.Persons.find((person) => person.Id == _PersonId)

        if (personToRemove.Partner instanceof Person) {
            const partner = this.FamilyTree.Persons.find((partner) => partner.Id == personToRemove.Partner.Id)
            partner.Partner = null;
        }

        for (const person of this.FamilyTree.Persons) {
            if (person.Children.length > 0) {
                const index = person.Children.findIndex((child) => child.Id == personToRemove.Id)
                if (index != ServerConstants.NOT_EXIST_PERSON) {
                    person.Children.splice(index, 1)
                }
            }
        }
    }
}

module.exports = ServiceFamilyTree