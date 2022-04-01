// création du routeur Express pour ce module
const express = require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const routeur = express.Router()


// Ajout des controllers //
const ctrlProf = require('../controllers/ctrlProf')
const ctrlReferent = require('../controllers/ctrlReferent')
const ctrlEleve = require('../controllers/ctrlEleve')
const ctrlProviseur = require('../controllers/ctrlProviseur')

// Enregistrement des routeurs

    // ------------------------ Api Authentification ---------------------------- //

routeur.get('/Authentification/:table/:pseudo/:mdp', ctrlProf.Connexion)

    // ------------------------ Api pour Eleves ---------------------------- //

//afficher toutes les notes de l'élève
    .get('/Afficher_Notes_Eleve/:idEleve', ctrlEleve.afficher_note_eleve)

    // ------------------------ Api pour Professeurs ---------------------------- //

//afficher les classes d'un professeur
    .get('/Classes/:id', ctrlProf.afficher_classe_prof)
//afficher la liste des eleves d'une classe
    .get('/Eleves_Classe/:id', ctrlProf.afficher_details_classe)
//affiche les notes d'un eleve dans une matiere
    .get('/Notes_Matiere/:idProf/:idEleve', ctrlProf.afficher_note_eleve_matiere)
//supprimer une note
    .delete('/Suppr_Notes_Matiere/:idNote', ctrlProf.supprimer_note_eleve_matiere)
//ajoute une note a un eleve dans une matiere precise + description de la note
    .post('/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', ctrlProf.ajouter_note_eleve_matiere)
//modifier une note 
    .post('/modif_Notes_Matiere/:note/:idNote', ctrlProf.modifier_note_eleve_matiere)

    // ------------------------ Api pour Référent ---------------------------- //
//liste déroulante pour choisir la classe du nouvelle élève
    .get('/Classes', ctrlReferent.afficher_classe)

//créer une nouvel eleve 
    .post('/Ajout_Nouvel_Eleve/:pseudo/:mdp/:nom/:prenom/:Id_Classe', ctrlReferent.ajouter_new_eleve)

    // ------------------------ Api pour Proviseur ---------------------------- //
//affiche les matieres
    .get('/Matieres', ctrlProviseur.afficher_Matieres)
//céer une matiere 
    .post('/Ajout_Nouvelle_Matiere/:nom', ctrlProviseur.ajouter_Matiere)

//créer des prof 

//modifier une note 


// Exportation //
module.exports = routeur