const axios = require('axios'); 
const apiAdresse = "http://localhost:3001";

// Affichage Menu //
const page_de_connexion = (req, res) => {
    req.session.table = 1;
    res.render('pageConnexion')
}

const deconnexion = (req, res) => {
    req.session.table = undefined;
    req.session.Id = undefined;
    res.render('pageConnexion')
}

const Connexion = (req, res) => {
    let table = req.body.table;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;

    axios({
        method: 'post',
        url: apiAdresse+'/Asimov/api/Authentification',
        data: {table : table, pseudo : pseudo, mdp : mdp }
    })
    .then((reponse) => {
        //On traite la suite une fois la réponse obtenue
        let data = reponse.data[0];
        let id;
        req.session.table = table;
        if(table != 1){
            id = data.idProf;
            req.session.Id = id;
            req.session.proviseur = 0;
            req.session.referent = 0;
            if(data.Proviseur == 1){
                req.session.proviseur = 1;
                res.redirect("/Proviseur/Classes")
            }else if(data.Referent == 1){
                req.session.referent = 1;
                res.redirect("/Referent/Classes")
            }else{
                res.redirect("/myClasses/"+id)
            }
        }else{
            console.log('connecté !')
            id = data.idEleve;
            req.session.Id = id;
            res.redirect("http://localhost:3000/Asimov/Eleve/mesNotes/"+id)
        }
    })
    .catch((erreur) => {
        //On traite ici les erreurs éventuellement survenues
        res.render('pageConnexion', {err : 1, msgErreur : "Identifiant ou mot de passe incorrect !"})
    })
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
    deconnexion,
    Connexion,
    afficher_classe,
    afficher_details_classe,
    afficher_note_eleve,
    modifier_note_eleve
}