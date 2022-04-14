const axios = require('axios');
const apiAdresse = "http://localhost:3001";

const afficher_Matieres = async (req, res) => {

    if(req.session.proviseur == 1){
        await axios.get(apiAdresse+'/Asimov/api/Matieres')
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            let data = reponse.data;
            console.log(data)
            res.render('listeMatieres', {matieres : data})
        })
        .catch((err) => {
            //On traite ici les erreurs éventuellement survenues
            console.log('ALED');
            res.render('listeMatieres', {err : "Aucune matiere trouvée"})
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const afficher_Prof = async (req, res) => {

    if(req.session.proviseur == 1){
        await axios.get(apiAdresse+'/Asimov/api/Professeurs')
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            let data = reponse.data;
            console.log(data)
            req.session.prof = data;
        })
        .catch((err) => {
            //On traite ici les erreurs éventuellement survenues
            console.log('ALED');
            req.session.profErr = "Aucun professeur trouvé !";
        })
        await axios.get(apiAdresse+'/Asimov/api/Matieres')
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            let Matieres = reponse.data;
            res.render('listeProfs', {profs : req.session.prof, matieres : Matieres})
        })
        .catch((err) => {
            //On traite ici les erreurs éventuellement survenues
            console.log('ALED');
            res.render('listeProfs', {errMatiere : "Aucun professeur trouvé !", errProf : req.session.profErr})
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const ajouter_Matiere = async (req, res) => {
    if(req.session.proviseur == 1){
        let nom = req.body.nom;

        await axios({
            method: 'post',
            url: apiAdresse+'/Asimov/api/Ajout_Nouvelle_Matiere',
            data: {nom : nom}
        })
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            res.render("evenement", { msg : "Insertion réussi !", url : "/Asimov/Matieres" })     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            res.render("evenement", { msg : "Une erreur est survenue !", url: "/Asimov/Matieres" }) 
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const ajouter_Prof = async (req, res) => {
    if(req.session.proviseur == 1){
        let mdp = req.body.mdp;
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let idMatiere = req.body.idMatiere;
        let pseudo = nom+"."+prenom;

        await axios({
            method: 'post',
            url: apiAdresse+'/Asimov/api/Ajout_Nouveau_Prof',
            data: {nom : nom, prenom : prenom, idMatiere : idMatiere, pseudo : pseudo, mdp : mdp}
        })
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            res.render("evenement", { msg : "Insertion réussi !", url : "/Asimov/Professeurs" })     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            res.render("evenement", { msg : "Une erreur est survenue !", url: "/Asimov/Professeurs" }) 
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const formulaire_modif_prof = async (req, res) => {
    if(req.session.proviseur == 1){
        let idProf = req.params.idProf;
        res.render('formModifProf', {idProf : idProf})
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const modif_Prof = async (req, res) => {
    if(req.session.proviseur == 1){
        let idProf = req.body.idProf
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let pseudo = req.body.pseudo;

        await axios({
            method: 'post',
            url: apiAdresse+'/Asimov/api/Modif_Prof',
            data: {idProf : idProf, nom : nom, prenom : prenom, pseudo : pseudo}
        })
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            res.render("evenement", { msg : "Insertion réussi !", url : "/Asimov/Professeurs" })     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            res.render("evenement", { msg : "Une erreur est survenue !", url: "/Asimov/Professeurs" }) 
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const formulaire_modif_matiere = async (req, res) => {
    if(req.session.proviseur == 1){
        let idMatiere = req.params.idMatiere;
        res.render('formModifMatiere', {idMatiere : idMatiere})
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const modif_Matiere = async (req, res) => {
    if(req.session.proviseur == 1){
        let idMatiere = req.body.idMatiere;
        let nom = req.body.nom;

        await axios({
            method: 'post',
            url: apiAdresse+'/Asimov/api/Modif_Matiere',
            data: {idMatiere : idMatiere, nom : nom}
        })
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            res.render("evenement", { msg : "Insertion réussi !", url : "/Asimov/Matieres" })     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            res.render("evenement", { msg : "Une erreur est survenue !", url: "/Asimov/Matieres" }) 
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const suppr_Prof = async (req, res) => {

}

const suppr_Matiere = async (req, res) => {
    
}
// + Controller afficher_details_classe dans ctrlGlobal //

// Exportation //
module.exports = {
    afficher_Matieres,
    afficher_Prof,
    ajouter_Matiere,
    ajouter_Prof,
    formulaire_modif_matiere,
    modif_Matiere,
    formulaire_modif_prof,
    modif_Prof,
    suppr_Matiere,
    suppr_Prof
}