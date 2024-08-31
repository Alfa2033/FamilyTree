const ServiceFamilyTree = require('../service/ServiceFamilyTree')

class TreeController {
    constructor() {
        this.Service = new ServiceFamilyTree()
    }

    AddPerson = (_Name) => this.Service.AddPerson(_Name)
    AddChild = (_ParentId, _ChildId) => this.Service.AddChild(_ParentId, _ChildId)
    AddPartner = (_PersonId, _ParentId) => this.Service.SetPartner(_PersonId, _ParentId)
    GetTree = () => this.Service.GetTree()
    GetPersons = () => this.Service.GetPersons()
}

module.exports = TreeController;