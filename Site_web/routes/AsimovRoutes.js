// création du routeur Express pour ce module
const express = require('express')
let app = express()
const routeur = express.Router()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))

// Ajout des controllers //
const AsimovControle = require('../controllers/AsimoveController')

// Enregistrement des routeurs
routeur.get('/', AsimovControle.asimovMenu)

    // ------------------------ Api Authentification ---------------------------- //

    .get('/api/Authentification/:table/:pseudo/:mdp', AsimovControle.Connexion)

    // ------------------------ Api pour Eleves ---------------------------- //

    // ------------------------ Api pour Professeurs ---------------------------- //

    .get('/api/Classes/:id', AsimovControle.classeProf)

    .get('/api/Eleves_Classe/:id', AsimovControle.eleveClasse)

    .get('/api/Notes_Matiere/:idProf/:idEleve', AsimovControle.NotesMatiere)

    // ------------------------ Api pour Référent ---------------------------- //

    // ------------------------ Api pour Proviseur ---------------------------- //


// Exportation //
module.exports = routeur