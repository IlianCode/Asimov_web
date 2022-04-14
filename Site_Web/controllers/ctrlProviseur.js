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
        res.render('refused')
    }
}

const afficher_Prof = async (req, res) => {

    if(req.session.proviseur == 1){
        await axios.get(apiAdresse+'/Asimov/api/Professeurs')
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            let data = reponse.data;
            console.log(data)
            res.render('listeProfs', {profs : data})
        })
        .catch((err) => {
            //On traite ici les erreurs éventuellement survenues
            console.log('ALED');
            res.render('listeProfs', {err : "Aucun professeur trouvé !"})
        })
    }else{
        res.render('refused')
    }
}

const ajouter_Matiere = async (req, res) => {
    
    let nom = req.params.nom;

    await db.newMatiere(nom)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

const ajouter_Prof = async (req, res) => {

    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    let nom = req.params.nom;
    let prenom = req.params.prenom;
    let idMatiere = req.params.idMatiere;

    await db.newProf(pseudo, mdp, nom, prenom, idMatiere)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

// + Controller afficher_details_classe dans ctrlGlobal //

// Exportation //
module.exports = {
    afficher_Matieres,
    afficher_Prof,
    ajouter_Matiere,
    ajouter_Prof
}