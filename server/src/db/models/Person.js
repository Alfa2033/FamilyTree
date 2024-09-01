const { Response, ServerConstants } = require('../../dependencies/Dependencies')

class Person {
    constructor(Name, Id) {
        this.Id = Id;
        this.Name = Name;
        this.Children = [];
        this.Partner = null;
        this.ParentsComplete = false;
    }

    AddPartner(_Partner) {
        const response = new Response();

        if (!(_Partner instanceof Person)) {
            response.MessageOperation = ServerConstants.INVALID_MODEL
            return response
        }

        if (this.Partner instanceof Person) {
            response.MessageOperation = `${this.Name} ${ServerConstants.EXIST_PARTNER}`
            return response
        }

        if (_Partner.Partner instanceof Person) {
            response.MessageOperation = `${_Partner.Name} ${ServerConstants.EXIST_PARTNER}`
            return response
        }

        this.Partner = _Partner
        _Partner.Partner = this

        response.IsOk = true;
        response.MessageOperation = ServerConstants.ADD_PARTNER_OK
        return response
    }


    AddChildren(_Child) {
        const response = new Response()
        if (!(_Child instanceof Person)) {
            response.MessageOperation = ServerConstants.INVALID_MODEL
            return response
        }

        const existChild = this.Children.findIndex((child) => child.Id == _Child.Id)
        if (existChild != ServerConstants.NOT_EXIST_PERSON) {
            response.MessageOperation = ServerConstants.EXIST_CHILD
            return response
        }

        this.Children.push(_Child)

        response.IsOk = true;
        response.MessageOperation = ServerConstants.ADD_CHILD_OK
        return response;
    }
}

module.exports = Person