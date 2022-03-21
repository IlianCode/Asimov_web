const res = require('express/lib/response');
const db = require('../models/modelReferent') // Requetes 

const ajouter_new_eleve = async (req, res) => {

    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    let nom = req.params.nom;
    let prenom = req.params.prenom;
    let Id_Classe = req.params.Id_Classe;

    await db.createEleve(pseudo,mdp,nom,prenom,Id_Classe)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

const ajouter_new_classe= async(req,res) => {
    let nom = req.params.nom;

    await db.createClasse(nom)
    .then((data)=>{
        let err= false;
        console.log(data)
        res.json(data)

    }).catch((err)=>{
        console.log(err)
        res.json(err)
    })
}


// Exportation //
module.exports = {
    ajouter_new_eleve,
    ajouter_new_classe
}


