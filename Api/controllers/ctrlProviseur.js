const db = require('../models/modelProviseur') // Requetes 

const afficher_Matieres = async (req, res) => {

    await db.getMatiere()
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
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


// Exportation //
module.exports = {
    afficher_Matieres,
    ajouter_Matiere,
}