const db = require('../models/modelGlobal') // Requetes 

const Connexion = async (req, res) => {

    // Prelevé dans l'URL
    let table = req.params.table;
    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    //
    
    await db.Authentification(table, pseudo, mdp)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const Connexion_POST = async (req, res) => {

    let table = req.body.table;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;

    await db.Authentification(table, pseudo, mdp)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

// POUR : Référent et Proviseur //
const afficher_classe = async (req, res) => {

    await db.getClasse()
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

// POUR : Professeur et Proviseur //
const afficher_details_classe = async (req, res) => {

    let idClasse = req.params.id;

    await db.getEleve_classe(idClasse)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

// POUR : Eleve et Proviseur //
const afficher_note_eleve = async (req, res) => {
    
    let idEleve = req.params.idEleve;

    await db.getNotes_Eleve(idEleve, idEleve)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

// POUR : Professeur et Proviseur //
const modifier_note_eleve = async (req, res) => {

    let note = req.params.note;
    let idNote= req.params.idNote;

    await db.modifNote(note, idNote)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const modifier_note_eleve_POST = async (req, res) => {

    let note = req.body.note;
    let idNote = req.body.idNote;

    await db.modifNote(note, idNote)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

// Exportation //
module.exports = {
    Connexion,
    Connexion_POST,
    afficher_classe,
    afficher_details_classe,
    afficher_note_eleve,
    modifier_note_eleve,
    modifier_note_eleve_POST
}