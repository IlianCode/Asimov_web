const axios = require('axios');
const moment = require('../config/moment')

const page_des_notes = (req, res) => {
    let id = req.params.id;
    console.log(id);
    axios.get('http://localhost:3001/Asimov/api/Afficher_Notes_Eleve/'+id)
    .then((reponse) => {
        //On traite la suite une fois la réponse obtenue

        let data = reponse.data;
        console.log(data)
        let ok = false;
        let compteur = 0;
        let tableIdMatiere = [];

        while(ok != true){
            if(data[compteur].Moyenne != null){
                tableIdMatiere.push(data[compteur].idMatiere)
                compteur++
            }else{
                ok = true;
            }
        }
        res.render('mesNotes', {data : data, tableMatiere : tableIdMatiere, compteur : compteur, moment : moment})
    })
    .catch((erreur) => {
        //On traite ici les erreurs éventuellement survenues
        console.log('ALED');
        res.render('erreur');
    })
}

// Exportation //
module.exports = {
    page_des_notes
}