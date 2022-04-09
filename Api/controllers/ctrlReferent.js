//const res = require('express/lib/response');
const db = require('../models/modelReferent') // Requetes 

const ajouter_new_eleve = async (req, res) => {

    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    let nom = req.params.nom;
    let prenom = req.params.prenom;
    let Id_Classe = req.params.Id_Classe;

    await db.newEleve(pseudo,mdp,nom,prenom,Id_Classe)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

const ajouter_new_eleve_POST = async (req, res) => {

    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let Id_Classe = req.body.Id_Classe;

    await db.newEleve(pseudo,mdp,nom,prenom,Id_Classe)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

// + Controller afficher_classe dans ctrlGlobal //


// Exportation //
module.exports = {
    ajouter_new_eleve,
    ajouter_new_eleve_POST
}


