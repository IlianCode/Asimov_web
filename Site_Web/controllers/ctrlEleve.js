const axios = require('axios');
const moment = require('../config/moment')
const apiAdresse = "http://localhost:3001";

const page_des_notes = (req, res) => {
    let id = req.params.id;
    if(req.session.table == 1 && req.session.Id == id){
        axios.get(apiAdresse+'/Asimov/api/Afficher_Notes_Eleve/'+id)
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            let data = reponse.data;
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
        .catch((err) => {
            //On traite ici les erreurs éventuellement survenues
            console.log('ALED');
            err = err.response.data;
            res.render('mesNotes', {err : err})
        })
    }else{
        res.render('refused')
    }  
}

// Exportation //
module.exports = {
    page_des_notes
}