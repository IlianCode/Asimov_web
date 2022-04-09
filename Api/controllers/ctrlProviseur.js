const db = require('../models/modelProviseur') // Requetes 

const afficher_Matieres = async (req, res) => {

    await db.getMatiere()
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const afficher_Prof = async (req, res) => {

    await db.getProf()
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const ajouter_Matiere = async (req, res) => {
    
    let nom = req.params.nom;

    await db.newMatiere(nom)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const ajouter_Matiere_POST = async (req, res) => {
    
    let nom = req.body.nom;

    await db.newMatiere(nom)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const ajouter_Prof = async (req, res) => {

    let pseudo = req.params.pseudo;
    let mdp = req.params.mdp;
    let nom = req.params.nom;
    let prenom = req.params.prenom;
    let idMatiere = req.params.idMatiere;

    await db.newProf(pseudo, mdp, nom, prenom, idMatiere)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

const ajouter_Prof_POST = async (req, res) => {

    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let idMatiere = req.body.idMatiere;

    await db.newProf(pseudo, mdp, nom, prenom, idMatiere)
    .then((data) => {
        console.log(data)
        res.status('200').json(data)
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

//supprimet une matiere 
const supprimer_Matiere = async (req, res) => {
    
        let idMatiere = req.params.idMatiere;
    
        await db.deleteMatiere(idMatiere)
        .then((data) => {
            console.log(data)
            res.json()
        }).catch((err) => {
            console.log(err)
            res.status('404').json(err)
        })
}
//modifer une matiere
const modifier_Matiere = async (req, res) => {
        
        let idMatiere = req.params.idMatiere;
        let nom = req.params.nom;
        
        await db.updateMatiere(idMatiere, nom)
        .then((data) => {
            console.log(data)
            res.json()
        }).catch((err) => {
            console.log(err)
            res.status('404').json(err)
        })
}

const modifier_Matiere_POST = async (req, res) => {
        
    let idMatiere = req.body.idMatiere;
    let nom = req.body.nom;
    
    await db.updateMatiere(idMatiere, nom)
    .then((data) => {
        console.log(data)
        res.json()
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

// + Controller afficher_details_classe dans ctrlGlobal //

// Exportation //
module.exports = {
    afficher_Matieres,
    afficher_Prof,
    ajouter_Matiere,
    ajouter_Matiere_POST,
    ajouter_Prof,
    ajouter_Prof_POST,
    supprimer_Matiere,
    modifier_Matiere,
    modifier_Matiere_POST
}