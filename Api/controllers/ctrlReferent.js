const db = require('../models/modelProf') // Requetes 

const ajouter_new_eleve = async (req, res) => {

    let idProf = req.params.id;

    await db.getClasse_prof(idProf)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}
