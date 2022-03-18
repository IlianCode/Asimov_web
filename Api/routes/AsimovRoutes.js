// création du routeur Express pour ce module
const express = require('express')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const routeur = express.Router()


// Ajout des controllers //
const AsimovControle = require('../controllers/AsimoveController')

// Enregistrement des routeurs

    // ------------------------ Api Authentification ---------------------------- //

routeur.get('/api/Authentification/:table/:pseudo/:mdp', AsimovControle.Connexion)

    // ------------------------ Api pour Eleves ---------------------------- //

    // ------------------------ Api pour Professeurs ---------------------------- //

    .get('/api/Classes/:id', AsimovControle.classeProf)

    .get('/api/Eleves_Classe/:id', AsimovControle.eleveClasse)

    .get('/api/Notes_Matiere/:idProf/:idEleve', AsimovControle.NotesMatiere)

    .post('/api/Ajout_Notes_Matiere/:idMatiere/:idEleve/:titre/:note', AsimovControle.AjoutDeNoteMatiere)

    // ------------------------ Api pour Référent ---------------------------- //

    // ------------------------ Api pour Proviseur ---------------------------- //


// Exportation //
module.exports = routeur