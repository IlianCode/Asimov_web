const db = require('../models/modelProf') // Requetes 

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


const afficher_classe_prof = async (req, res) => {

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


const afficher_details_classe = async (req, res) => {

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

const afficher_note_eleve_matiere = async (req, res) => {

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

const ajouter_note_eleve_matiere = async (req, res) => {

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

const modifier_note_eleve_matiere = async (req, res)=> {
    let idMatiere = req.params.idMatiere;
    let idEleve = req.params.idEleve;
    let titre = req.params.titre;
    let note = req.params.note;
    let idNote= req.params.idNote;

    await db.modifNote_Matiere(idMatiere, idEleve, titre, note, idNote)
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
    afficher_classe_prof, 
    afficher_details_classe,
    afficher_note_eleve_matiere,
    ajouter_note_eleve_matiere,
    modifier_note_eleve_matiere
}




