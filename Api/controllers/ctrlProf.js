const db = require('../models/modelProf') // Requetes 

const afficher_classe_prof = async (req, res) => {

    let idProf = req.params.id;

    await db.getClasse_prof(idProf)
    .then((data) => {
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
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

const supprimer_note_eleve = async (req, res) => {

    let idNote= req.params.idNote;

    await db.deleteNote(idNote)
    .then((data) => {
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}



// Exportation //
module.exports = {
    afficher_classe_prof, 
    afficher_note_eleve_matiere,
    ajouter_note_eleve_matiere,
    supprimer_note_eleve
}




