const ServiceFamilyTree = require('../service/ServiceFamilyTree')

class TreeController {
    constructor() {
        this.Service = new ServiceFamilyTree()
    }

    AddPerson = async (_Name) => await this.Service.AddPerson(_Name)
    AddChild = async (_ParentId, _ChildId) => await this.Service.AddChild(_ParentId, _ChildId)
    AddPartner = async (_PersonId, _ParentId) => await this.Service.SetPartner(_PersonId, _ParentId)
    GetTree = () => this.Service.GetTree()
    GetPersons = () => this.Service.GetPersons()
    DeletePerson = async (_PersonId) => this.Service.RemovePerson(_PersonId)
}

module.exports = TreeController;