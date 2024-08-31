const { uuid } = require('../../dependencies/Dependencies')

class Tree {
    constructor() {
        this.Id = uuid.v4();
        this.Persons = [];
    }
}

module.exports = Tree;