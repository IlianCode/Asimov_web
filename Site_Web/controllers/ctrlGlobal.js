const FormData = require('form-data');
const axios = require('axios');

// Affichage Menu //
const page_de_connexion = (req, res) => {
    res.render('pageConnexion')
}

const Connexion = (req, res) => {

    let mesDonnees = new FormData();
    let table = req.body.table;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;

    mesDonnees.append("table", table);
    mesDonnees.append("pseudo", pseudo);
    mesDonnees.append("mdp", mdp);
    console.log(mesDonnees)

    axios({
        method: 'post',
        url: 'http://localhost:3001/Asimov/api/Authentification',
        data: mesDonnees
    })
    .then((reponse) => {
        //On traite la suite une fois la réponse obtenue 
        console.log(reponse);
    })
    .catch((erreur) => {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
    });
    res.render('mesNotes')
}

// POUR : Référent et Proviseur //
const afficher_classe = async (req, res) => {

    await db.getClasse()
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

// POUR : Professeur et Proviseur //
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

// POUR : Eleve et Proviseur //
const afficher_note_eleve = async (req, res) => {
    
    let idEleve = req.params.idEleve;

    await db.getNotes_Eleve(idEleve, idEleve)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

// POUR : Professeur et Proviseur //
const modifier_note_eleve = async (req, res) => {

    let note = req.params.note;
    let idNote= req.params.idNote;

    await db.modifNote(note, idNote)
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
    page_de_connexion,
    Connexion,
    afficher_classe,
    afficher_details_classe,
    afficher_note_eleve,
    modifier_note_eleve
}