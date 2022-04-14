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

//supprimer un professeur
const supprimer_Prof = async (req, res) => {
        
    let idProf = req.params.idProf;
        
    await db.deleteProf(idProf)
    .then((data) => {
        console.log(data)
        res.json()
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}
//modifier un professeur
const modifier_Prof = async (req, res) => {
            
    let idProf = req.params.idProf;
    let nom = req.params.nom;
    let prenom = req.params.prenom;    
    let pseudo = req.params.pseudo;     
            
    await db.updateProf(idProf,pseudo, nom, prenom)
    .then((data) => {
        console.log(data)
        res.json()
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}

//modifier un professeur
const modifier_Prof_POST = async (req, res) => {
            
    let idProf = req.body.idProf;
    let nom = req.body.nom;
    let prenom = req.body.prenom; 
    let pseudo = req.body.pseudo;        
            
    await db.updateProf(idProf, pseudo, nom, prenom)
    .then((data) => {
        console.log(data)
        res.json()
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}
//afficher toutes les notes
const afficher_Notes = async (req, res) => {
        
        await db.getNotes()
        .then((data) => {
            console.log(data)
            res.status('200').json(data)
        }).catch((err) => {
            console.log(err)
            res.status('404').json(err)
        })
}

//afficher tous les eleves
const afficher_Eleves = async (req, res) => {
            
            await db.getEleves()
            .then((data) => {
                console.log(data)
                res.status('200').json(data)
            }).catch((err) => {
                console.log(err)
                res.status('404').json(err)
            })
}

//ajouter note
const ajouter_Notes_Date = async (req, res) => {
                
        let idEleve = req.params.idEleve;
        let idMatiere = req.params.idMatiere;
        let note = req.params.note;
        let date = req.params.date;
        let titre= req.params.titre;
                
        await db.addNote(idEleve, idMatiere, note, date,titre)
        .then((data) => {
            console.log(data)
            res.json()
        }).catch((err) => {
            console.log(err)
            res.status('404').json(err)
        })
}

//modifier nom classe 
const modifier_Classe = async (req, res) => {
                    
            let idClasse = req.params.idClasse;
            let nom = req.params.nom;
                    
            await db.updateClasse(idClasse, nom)
            .then((data) => {
                console.log(data)
                res.json()
            }).catch((err) => {
                console.log(err)
                res.status('404').json(err)
            })  
}

//supprimer une classe
const supprimer_Classe = async (req, res) => {
                        
                let idClasse = req.params.idClasse;
                        
                await db.deleteClasse(idClasse)
                .then((data) => {
                    console.log(data)
                    res.json()
                }).catch((err) => {
                    console.log(err)
                    res.status('404').json(err)
                })
}

//créer nouvelle classe 
const ajouter_Classe = async (req, res) => {
                                
    let nom = req.params.nom;
                                
    await db.newClasse(nom)
    .then((data) => {
        console.log(data)
        res.json()
    }).catch((err) => {
        console.log(err)
        res.status('404').json(err)
    })
}
//afficher les eleves
const afficher_Eleves_Proviseur = async (req, res) => {
                                            
                                            
        await db.getElevesProviseur()
        .then((data) => {
            console.log(data)
            res.status('200').json(data)
        }).catch((err) => {
            console.log(err)
            res.status('404').json(err)
        })  
}
//supprimer un eleve
const supprimer_Eleve = async (req, res) => {
                                        
        let idEleve = req.params.idEleve;
                                        
        await db.deleteEleve(idEleve)
        .then((data) => {
            console.log(data)
            res.json()
        }).catch((err) => {
            console.log(err)
            res.status('404').json(err)
        })
}
//modifier un eleve 
const modifier_Eleve = async (req, res) => {
                                                
            let idEleve = req.params.idEleve;
            let nom = req.params.nom;
            let prenom = req.params.prenom;
            let idClasse = req.params.idClasse;
            let pseudo = nom+"."+prenom;                      
            await db.updateEleve(idEleve,pseudo, nom, prenom, idClasse)
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
    modifier_Matiere_POST,
    supprimer_Prof,
    modifier_Prof,
    modifier_Prof_POST,
    afficher_Notes,
    afficher_Eleves,
    ajouter_Notes_Date,
    modifier_Classe,
    supprimer_Classe,
    ajouter_Classe,
    afficher_Eleves_Proviseur,
    supprimer_Eleve,
    modifier_Eleve
}