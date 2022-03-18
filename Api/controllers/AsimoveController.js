const db = require('../models/donnees') // Requetes 

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

const AjouteDeNoteMatiere = async (req, res) => {

    let idMatiere = req.params.idMatiere;
    let idEleve = req.params.idEleve;
    let titre = req.params.titre;
    let note = req.params.note;

    await db.newNote_Matiere(idMatiere, idEleve, titre, note)
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
    Connexion,
    classeProf, 
    eleveClasse,
    NotesMatiere,
    AjouteDeNoteMatiere,
}




