const axios = require('axios');

// Affichage Menu //
const page_de_connexion = (req, res) => {
    res.render('pageConnexion')
}

const Connexion = (req, res) => {
    let table = req.body.table;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;

    axios({
        method: 'post',
        url: 'http://localhost:3001/Asimov/api/Authentification',
        data: {table : table, pseudo : pseudo, mdp : mdp }
    })
    .then((reponse) => {
        //On traite la suite une fois la réponse obtenue 
        console.log(reponse)
        let data = reponse.data[0];
        let Nom = data.nom+' '+data.prenom;
        let Classe = data.classe;
        console.log(Nom, Classe)
        res.render('mesNotes')
    })
    .catch((erreur) => {
        //On traite ici les erreurs éventuellement survenues
        res.render('pageConnexion', {err : 1, msgErreur : "Identifiant ou mot de passe incorrect !"})
    });
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