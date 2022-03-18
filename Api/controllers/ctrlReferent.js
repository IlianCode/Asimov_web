const db = require('../models/modelProf') // Requetes 

const ajouter_new_eleve = async (req, res) => {

    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    let nom = req.params.nom;
    let prenom = req.params.prenom;
    let Id_Classe = req.params.Id_Classe;

    await db.getClasse_prof(pseudo,mdp,nom,prenom,Id_Classe)
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
    ajouter_new_eleve
}

