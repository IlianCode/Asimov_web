// création du routeur Express pour ce module
const express = require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const routeur = express.Router()


// Ajout des controllers //
const ctrlProf = require('../controllers/ctrlProf')
const ctrlReferent = require('../controllers/ctrlReferent')

// Enregistrement des routeurs

    // ------------------------ Api Authentification ---------------------------- //

routeur.get('/api/Authentification/:table/:pseudo/:mdp', ctrlProf.Connexion)

    // ------------------------ Api pour Eleves ---------------------------- //

    // ------------------------ Api pour Professeurs ---------------------------- //
//afficher les classes d'un professeur
    .get('/api/Classes/:id', ctrlProf.afficher_classe_prof)
//afficher la liste des eleves d'une classe
    .get('/api/Eleves_Classe/:id', ctrlProf.afficher_details_classe)
//affiche les notes d'un eleve dans une matiere
    .get('/api/Notes_Matiere/:idProf/:idEleve', ctrlProf.afficher_note_eleve_matiere)
//ajoute une note a un eleve dans une matiere precise + description de la note
    .post('/api/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', ctrlProf.ajouter_note_eleve_matiere)

//modifier une note 


    // ------------------------ Api pour Référent ---------------------------- //
//créer une nouvel eleve 
    .post('/api/Ajout_Nouvel_eleve/:pseudo/:mdp/:nom/:prenom/:Id_Classe', ctrlReferent.ajouter_new_eleve)
    
// créer une nouvelle classe 


    // ------------------------ Api pour Proviseur ---------------------------- //
//céer une matiere 

// créer des prof 

//modifier une note 


// Exportation //
module.exports = routeur