import { $ } from "./Dependencies/Dependencies.js";
import FamilyTree from "./Classes/FamilyTree.js";

(function(){
     const familyTree = new FamilyTree();

     familyTree.GetCharacters()
     $("btn_addPerson").addEventListener("click", function () {
          const name = $("txt_Name").value
          familyTree.AddCharacter(name)
     });

     $("btn_addPartner").addEventListener("click", function () {
          const partner1 = $("select_Parnert_1").value
          const partner2 = $("select_Parnert_2").value
          familyTree.AddPartner(partner1, partner2)
     })

     $("btn_addChild").addEventListener("click", function () {
          const child = $("select_Child").value
          const parent = $("select_Parent").value
          familyTree.AddChild(parent, child)
     })

     $("btn_checkTree").addEventListener("click", function () {
          familyTree.PrintTree()
     })
})()
