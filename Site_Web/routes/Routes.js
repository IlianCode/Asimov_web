// création du routeur Express pour ce module
const express = require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const routeur = express.Router()


// Ajout des controllers //
const ctrlGlobal = require('../controllers/ctrlGlobal')
const ctrlEleve = require('../controllers/ctrlEleve')
const ctrlProf = require('../controllers/ctrlProf')
const ctrlReferent = require('../controllers/ctrlReferent')
const ctrlProviseur = require('../controllers/ctrlProviseur')


// Enregistrement des routeurs


    // -------------------------- Global --------------------------------- //
// Afficher la page de connexion
routeur.get('/', ctrlGlobal.page_de_connexion) // OK

// Déconnexion (fait expirer la session)
    .get('/Deco', ctrlGlobal.deconnexion) // OK
    
// S'authentifier
    .post('/Authentification', ctrlGlobal.Connexion) // OK

// Afficher toutes les classes (Pour Proviseur et Referent)
    .get('/Classes', ctrlGlobal.afficher_classe) // OK

// Afficher la liste des eleves d'une classe (Pour Professeur et Proviseur)
    .get('/Eleves_Classe/:idProf/:idClasse', ctrlGlobal.afficher_details_classe) // OK 


    // ------------------------ Pour Eleves ----------------------- //
// Afficher ses notes (à l'élève)
    .get('/Notes/Eleve/:id', ctrlEleve.page_des_notes) // OK


    // ------------------------ Pour Proviseur -------------------------- //


    
// Afficher les matieres
    .get('/Matieres', ctrlProviseur.afficher_Matieres) // OK

// Afficher les professeurs
    .get('/Professeurs', ctrlProviseur.afficher_Prof) // OK

// Céer une matiere 
    .post('/Ajout_Nouvelle_Matiere', ctrlProviseur.ajouter_Matiere) // OK

// Créer des prof 
    .post('/Ajout_Nouveau_Prof', ctrlProviseur.ajouter_Prof) // OK

// Afficher formulaire de modification de note
    .get('/formulaire_Modif_Note/:idClasse/:idEleve/:idNote', ctrlGlobal.formulaire_modif_note) // OK

    .get('/formulaire_modif_Prof/:idProf', ctrlProviseur.formulaire_modif_prof) // OK

    .get('/formulaire_modif_Matiere/:idMatiere', ctrlProviseur.formulaire_modif_matiere) // OK

// Modifier une note 
    .post('/Modif_Notes', ctrlGlobal.modifier_note_eleve) // OK

// Supprimer une matière
    .get('/Suppr_Matiere/:idMatiere', ctrlProviseur.suppr_Matiere) // OK

//modifier une matiere
    .post('/Modif_Matiere', ctrlProviseur.modif_Matiere) // OK

// Supprimer un professeur
    .get('/Suppr_Prof/:idProf', ctrlProviseur.suppr_Prof) // OK

//modifier un professeur
    .post('/Modif_Prof', ctrlProviseur.modif_Prof) // OK




    // ------------------------ Pour Professeurs ----------------------- //

// Afficher les classes d'un professeur
    .get('/MyClasses/:id', ctrlProf.afficher_classe_prof) // OK

// Afficher les notes d'un eleve dans une matiere
    .get('/Notes_Matiere/:idProf/:idEleve', ctrlProf.afficher_note_eleve_matiere) // OK

// Supprimer une note
    .get('/Suppr_Notes/:idClasse/:idEleve/:idNote', ctrlGlobal.supprimer_note_eleve_matiere) // OK

// Ajouter une note a un eleve dans une matiere precise + description de la note
    .post('/Ajout_Notes_Matiere', ctrlProf.ajouter_note_eleve_matiere) // OK





    // ------------------------ Pour Référent --------------------------- //
// Créer un nouvel eleve 
    .post('/Ajout_Nouvel_Eleve', ctrlReferent.ajouter_new_eleve) // OK


// Exportation //
module.exports = routeur