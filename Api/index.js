// inclure les dépendances et middlewares 

const express = require('express') 
const mysql = require('mysql')
const iniparser = require('iniparser')

const Routeur = require('./routes/Routes')

// activation des dépendances 
let app = express()
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