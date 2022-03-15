const db = require('../models/donnees') // Requetes 


// Affichage Menu //
const asimovMenu = (req, res) => {
    res.render('menu')
}


const Connexion = async (req, res) => {

    // Prelevé dans l'URL
    let table = req.params.table;
    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    //
    
    await db.Authentification(table, pseudo, mdp)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}


const classeProf = async (req, res) => {

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


const eleveClasse = async (req, res) => {

    let idClasse = req.params.id;

    await db.getEleve_classe(idClasse)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

const NotesMatiere = async (req, res) => {

    let idProf = req.params.idProf;
    let idEleve = req.params.idEleve;

    await db.getNotes_Matiere(idEleve, idProf)
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
    asimovMenu,
    Connexion,
    classeProf, 
    eleveClasse,
    NotesMatiere,
}




