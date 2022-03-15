// inclure les dépendances et middlewares 

const express = require('express') 
const ejs = require('ejs')
const mysql = require('mysql')
const iniparser = require('iniparser')

const Routeur = require('./routes/AsimovRoutes')

// activation des dépendances 
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Définition du port de l'application  
const port = process.env.port || 3000

// DÉMARRAGE DE L'APPLICATION
app.listen(port, () => {
    console.log(`Serveur HTTP fonctionnel. Go http://localhost:${port}`)
  })

app.use('/Asimov', Routeur);

module.exports = app

// erreur 404 //
app.use((req, res) => {
    res.status(404).render('erreur')
});