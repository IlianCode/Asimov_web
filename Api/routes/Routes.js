// création du routeur Express pour ce module
const express = require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const routeur = express.Router()


// Ajout des controllers //
const ctrlGlobal = require('../controllers/ctrlGlobal')
const ctrlProf = require('../controllers/ctrlProf')
const ctrlReferent = require('../controllers/ctrlReferent')
const ctrlProviseur = require('../controllers/ctrlProviseur')


// Enregistrement des routeurs


    // ------------------------ Api Global --------------------------------- //

//S'authentifier
routeur.get('/Authentification/:table/:pseudo/:mdp', ctrlGlobal.Connexion) // Pour tout le monde

//afficher la liste des classes
    .get('/Classes', ctrlGlobal.afficher_classe) // Pour Référent et Proviseur

//afficher la liste des eleves d'une classe
    .get('/Eleves_Classe/:id', ctrlGlobal.afficher_details_classe) // Pour Professeur et Proviseur

//afficher toutes les notes de l'élève
    .get('/Afficher_Notes_Eleve/:idEleve', ctrlGlobal.afficher_note_eleve) // Pour Eleve et Proviseur

// Modifier une note 
    .post('/modif_Notes/:idNote/:note', ctrlGlobal.modifier_note_eleve)





    // ------------------------ Api pour Professeurs ----------------------- //

//afficher les classes d'un professeur
    .get('/Classes/:id', ctrlProf.afficher_classe_prof)

//affiche les notes d'un eleve dans une matiere
    .get('/Notes_Matiere/:idProf/:idEleve', ctrlProf.afficher_note_eleve_matiere)

//supprimer une note
    .get('/Suppr_Notes_Matiere/:idNote', ctrlProf.supprimer_note_eleve)
    .delete('/Suppr_Notes_Matiere/:idNote', ctrlProf.supprimer_note_eleve)

//ajoute une note a un eleve dans une matiere precise + description de la note
    .post('/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', ctrlProf.ajouter_note_eleve_matiere)
    .get('/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', ctrlProf.ajouter_note_eleve_matiere)





    // ------------------------ Api pour Référent --------------------------- //

//créer une nouvel eleve 
    .post('/Ajout_Nouvel_Eleve/:pseudo/:mdp/:nom/:prenom/:Id_Classe', ctrlReferent.ajouter_new_eleve)





    // ------------------------ Api pour Proviseur -------------------------- //
// matieres==========================
//afficher liste matieres
    .get('/Matieres', ctrlProviseur.afficher_Matieres)
    //céer une matiere 
    .post('/Ajout_Nouvelle_Matiere/:nom', ctrlProviseur.ajouter_Matiere)
    .get('/Ajout_Nouvelle_Matiere/:nom', ctrlProviseur.ajouter_Matiere)
    //supprimer une matiere
    .get('/Suppr_Matiere/:idMatiere', ctrlProviseur.supprimer_Matiere)
//===============
//affiche les professeurs
    .get('/Professeurs', ctrlProviseur.afficher_Prof)

    
//créer des prof 
    .post('/Ajout_Nouveau_Prof/:nom/:prenom/:idMatiere/:pseudo/:mdp', ctrlProviseur.ajouter_Prof)


// Exportation //
module.exports = routeur