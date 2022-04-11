// inclure les dépendances et middlewares 

const express = require('express') 
const mysql = require('mysql')
const iniparser = require('iniparser')
const ejs = require('ejs')
const session = require('cookie-session')

const Routeur = require('./routes/Routes')
const routeur = require('./routes/rout')

// activation des dépendances 
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({secret: 'quiEstTu?ProfRefProv|Eleve'}))

// Définition du port de l'application  
const port = process.env.port || 3000

// DÉMARRAGE DE L'APPLICATION
app.listen(port, () => {
    console.log(`Serveur HTTP fonctionnel. Go http://localhost:${port}`)
  })

app.use('/Asimov', Routeur);

/*app.use('/Asimov/Eleve', (req, res, next) =>{
  if(req.session.table != 1){
    console.log(req.session.table)
    routeur
    next;
    console.log("Ok")
  }else{
    console.log("erreur")
    res.status(404).send();
  }
});*/

// erreur 404 //
app.use((req, res) => {
  res.status(404).render('erreur')
});

module.exports = app