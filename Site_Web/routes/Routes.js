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
    .get('/Eleve/mesNotes/:id', ctrlEleve.page_des_notes) // OK


    // ------------------------ Pour Proviseur -------------------------- //
// Afficher la liste des classes
    .get('/Proviseur/Classes', ctrlGlobal.afficher_classe)


    
// Afficher les matieres
    .get('/Matieres', ctrlProviseur.afficher_Matieres)

// Afficher les professeurs
    .get('/Professeurs', ctrlProviseur.afficher_Prof)

// Céer une matiere 
    .post('/Ajout_Nouvelle_Matiere/:nom', ctrlProviseur.ajouter_Matiere)

// Créer des prof 
    .post('/Ajout_Nouveau_Prof/:nom/:prenom/:idMatiere/:pseudo/:mdp', ctrlProviseur.ajouter_Prof)



// Afficher la liste des classes
    .get('/Referent/Classes', ctrlGlobal.afficher_classe) // Pour Référent

// Afficher la liste des eleves d'une classe
    .get('/Eleves_Classe/:id', ctrlGlobal.afficher_details_classe) // Pour Professeur et Proviseur

// Afficher toutes les notes de l'élève
    .get('/Afficher_Notes_Eleve/:idEleve', ctrlGlobal.afficher_note_eleve) // Pour Eleve et Proviseur

// Modifier une note 
    .post('/modif_Notes/:idNote/:note', ctrlGlobal.modifier_note_eleve)




    // ------------------------ Pour Professeurs ----------------------- //

// Afficher les classes d'un professeur
    .get('/MyClasses/:id', ctrlGlobal.afficher_classe_prof) // OK

// Afficher les notes d'un eleve dans une matiere
    .get('/Notes_Matiere/:idProf/:idEleve', ctrlProf.afficher_note_eleve_matiere)

// Supprimer une note
    .get('/Suppr_Notes/:idNote', ctrlProf.supprimer_note_eleve)

// Ajoute une note a un eleve dans une matiere precise + description de la note
    .post('/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', ctrlProf.ajouter_note_eleve_matiere)





    // ------------------------ Pour Référent --------------------------- //
// Créer un nouvel eleve 
    .post('/Ajout_Nouvel_Eleve', ctrlReferent.ajouter_new_eleve) // OK


// Exportation //
module.exports = routeur