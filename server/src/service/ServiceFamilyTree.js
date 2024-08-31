const Tree = require('../db/models/Tree')
const Person = require('../db/models/Person')
const { Response, ServerConstants } = require('../dependencies/Dependencies');

class ServiceFamilyTree {
    #contentTree = "";
    constructor() {
        this.FamilyTree = new Tree();
    }

    AddPerson(_Name) {
        const response = new Response()

        if (_Name == "" || _Name == undefined) {
            response.MessageOperation = ServerConstants.MESSAGE_NEED_NAME
            return response;
        }

        const person = new Person(_Name)
        this.FamilyTree.Persons.push(person)

        response.IsOk = true;
        response.MessageOperation = ServerConstants.ADD_PERSON_OK
        response.Content = {
            Id: person.Id,
            Name: person.Name
        }
        return response;
    }

    RemovePerson(_PersonId) {
        const response = new Response()
        const indexPerson = this.FamilyTree.Persons.findIndex((person) => person.Id == _PersonId)

        if (indexPerson == ServerConstants.NOT_EXIST_PERSON) {
            response.MessageOperation = ServerConstants.MESSAGE_NOT_EXIST_PERSON
            return response
        }

        this.FamilyTree.Persons.splice(indexPerson, 1)
        response.MessageOperation = ServerConstants.DELETE_PERSON_OK
        response.IsOk = true
        return response
    }

    SetPartner(_PersonId, _PartnerId) {
        const response = new Response()
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

        return person.AddPartner(partner)
    }

    AddChild(_ParentId, _ChildId) {
        const response = new Response()
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

        if (addChildToParent.IsOk && addChildToPartner.IsOk) {
            child.ParentsComplete = true;
            response.MessageOperation = ServerConstants.ADD_CHILD_OK
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
}

module.exports = ServiceFamilyTree