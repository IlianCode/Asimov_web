const axios = require('axios');
const moment = require('../config/moment')
const apiAdresse = "http://localhost:3001";

const page_des_notes = (req, res) => {
    let id = req.params.id;
    if((req.session.table == 1 && req.session.Id == id) || req.session.proviseur == 1){
        axios.get(apiAdresse+'/Asimov/api/Afficher_Notes_Eleve/'+id)
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            let data = reponse.data;
            let ok = false;
            let compteur = 0;
            let moyGeneral = 0;
            let tableIdMatiere = [];

            while(ok != true){
                if(data[compteur].Moyenne != null){
                    tableIdMatiere.push(data[compteur].idMatiere)
                    moyGeneral += data[compteur].Moyenne;
                    compteur++
                }else{
                    moyGeneral /= compteur;
                    moyGeneral = moyGeneral.toFixed(2);
                    ok = true;
                }
            }

            if(req.session.proviseur == 1){
                res.render('mesNotes', {data : data, tableMatiere : tableIdMatiere, compteur : compteur, moyGeneral : moyGeneral, moment : moment, proviseur : true})
            }else{
                res.render('mesNotes', {data : data, tableMatiere : tableIdMatiere, compteur : compteur, moyGeneral : moyGeneral, moment : moment})
            }
        })
        .catch((err) => {
            //On traite ici les erreurs éventuellement survenues
            console.log('ALED');
            err = err.response.data;
            res.render('mesNotes', {err : err})
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }  
}

// Exportation //
module.exports = {
    page_des_notes
}