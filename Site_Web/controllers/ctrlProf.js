const axios = require('axios');
const apiAdresse = "http://localhost:3001";
const moment = require('../config/moment')

const afficher_classe_prof = async (req, res) => { // (POUR : Référent et Proviseur) //
    let id = req.params.id;
    if(req.session.table != 1 && req.session.proviseur != 1 && id == req.session.Id){
        await axios.get(apiAdresse+'/Asimov/api/Classes/'+id)
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                let data = reponse.data;
                if(req.session.referent == 1){
                    res.render('mesClasses', {classes : data, idProf : req.session.Id, ref : true})
                }else{
                    res.render('mesClasses', {classes : data, idProf : req.session.Id, ref : false})
                }
            })
            .catch((err) => {
                //On traite ici les erreurs éventuellement survenues
                console.log('ALED');
                res.render('mesClasses', {err : "Aucune classes trouvé !", idProf : req.session.Id, ref : true})
            })
    }else{
        res.render("refused");
    }
}

const afficher_note_eleve_matiere = async (req, res) => {
    let idProf = req.params.idProf;
    let idEleve = req.params.idEleve;
    
    if (idProf == req.session.Id && req.session.table != 1 && req.session.proviseur != 1){
        await axios.get(apiAdresse+'/Asimov/api/Notes_Matiere/'+idProf+'/'+idEleve)
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                let data = reponse.data; 
                let moyenne = 0;
                
                req.session.autorised = false;
                for (let i = 0; i < req.session.idAccess.length; i++){
                    if (data[0].Id_Classe == req.session.idAccess[i]){
                        req.session.autorised = true;
                    }
                }
                if (req.session.autorised == true){
                    data.forEach((eleve) => {
                        moyenne += eleve.note;
                    });
                    moyenne /= data.length;
                    moyenne = moyenne.toFixed(2)
                    if(req.session.referent == 1){
                        res.render('notesMatiere', {data : data, moyenne : moyenne, idProf : req.session.Id, ref : true, moment : moment})
                    }else{
                        res.render('notesMatiere', {data : data, moyenne : moyenne, idProf : req.session.Id, ref : false, moment : moment})
                    }
                }else{
                    res.render("refused")
                }
            })
            .catch((err) =>{
                console.log('ALED');
                if(req.session.referent == 1){
                    res.render('mesClasses', {err : "Aucune notes trouvé !", idProf : req.session.Id, ref : true})
                }else{
                    res.render('mesClasses', {err : "Aucune notes trouvé !", idProf : req.session.Id, ref : false})
                }
            })
    }else{
        res.render("refused")
    }
}

const ajouter_note_eleve_matiere = async (req, res) => {
    if (req.session.table != 1 && req.session.proviseur != 1){
        let idClasse = req.body.idClasse;

        req.session.autorised = false;
        for (let i = 0; i < req.session.idAccess.length; i++){
            if (idClasse == req.session.idAccess[i]){
                req.session.autorised = true;
            }
        }
        if (req.session.autorised == true){
            let idMatiere = req.body.idMatiere;
            let idEleve = req.body.idEleve;
            let titre = req.body.titre;
            let note = req.body.note;

            await axios({
                method: 'post',
                url: apiAdresse+'/Asimov/api/Ajout_Notes_Matiere',
                data: {idMatiere : idMatiere, idEleve : idEleve, titre : titre, note : note}
            })
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                res.render("evenement", { msg : "Insertion réussi !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })     
            })
            .catch((erreur) => {
                //On traite ici les erreurs éventuellement survenues
                res.render("evenement", { msg : "Une erreur est survenue !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve }) 
            })

        }else{
            res.render("refused")
        }
    }else{
        res.render("refused")
    }
}



// Exportation //
module.exports = {
    afficher_classe_prof,
    afficher_note_eleve_matiere,
    ajouter_note_eleve_matiere,
}




