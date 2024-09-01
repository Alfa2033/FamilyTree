import { $, $$ } from '../Dependencies/Dependencies.js'
import ServiceTree from "../Service/ServiceTree.js";

class FamilyTree {
    #listPersons = $("listpersons")
    #selectCharacter = Array.from($$("optionsCharacter"))

    #SetMessage(_Message) {
        $("responseService").innerText = _Message
    }

    async PrintTree() {
        try {
            const responseService = await ServiceTree.GetTree()
            if (!responseService.IsOk) {
                this.#SetMessage(responseService.MessageOperation)
                return
            }

            $("treevisualizer").innerText = responseService.Content
        } catch (error) {
            this.#SetMessage(error)
        }
    }

    async AddCharacter(_Name) {
        try {
            const responseService = await ServiceTree.AddPerson(_Name)
            if (!responseService.IsOk) {
                this.#SetMessage(responseService.MessageOperation)
                return
            }

            this.#SetMessage(responseService.MessageOperation)
            $("txt_Name").value = ""
            this.GetCharacters()
        }
        catch (error) {
            this.#SetMessage(error)
        }
    }

    async AddPartner(_PersonId, _PartnerId) {
        try {
            const responseService = await ServiceTree.AddPartner(_PersonId, _PartnerId)
            if (!responseService.IsOk) {
                this.#SetMessage(responseService.MessageOperation)
                return
            }

            this.#SetMessage(responseService.MessageOperation)
        }
        catch (error) {
            this.#SetMessage(error)
        }
    }

    async AddChild(_ParentId, _ChildId) {
        try {
            const responseService = await ServiceTree.AddChild(_ParentId, _ChildId)
            if (!responseService.IsOk) {
                this.#SetMessage(responseService.MessageOperation)
                return
            }

            this.#SetMessage(responseService.MessageOperation)
        }
        catch (error) {
            this.#SetMessage(error)
        }
    }

    async DeleteCharacter(_PersonId) {
        try {
            const responseService = await ServiceTree.DeletePerson(_PersonId)
            if (!responseService.IsOk) {
                this.#SetMessage(responseService.MessageOperation)
                return
            }

            this.GetCharacters()
            this.#SetMessage(responseService.MessageOperation)
        }
        catch (error) {
            this.#SetMessage(error)
        }
    }

    async GetCharacters() {
        try {
            const responseService = await ServiceTree.GetPersons()

            if (!responseService.IsOk) {
                this.#SetMessage(responseService.MessageOperation)
                return
            }

            const listCharacters = responseService.Content.reduce((acc, person) => {
                return `${acc}
                <div class="character">
                    <label id="${person.Id}">${person.Name}</label>
                </div>`
            }, "")

            const options = responseService.Content.reduce((acc, person) => {
                return `${acc}<option value="${person.Id}">${person.Name}</option>`
            }, "")

            this.#listPersons.innerHTML = ""
            this.#selectCharacter.forEach((item) => {
                item.innerHTML = ""
                item.insertAdjacentHTML("afterbegin", options)
            })
            this.#listPersons.insertAdjacentHTML("afterbegin", listCharacters)
        }
        catch (error) {
            this.#SetMessage(error)
        }
    }
}


export default FamilyTree