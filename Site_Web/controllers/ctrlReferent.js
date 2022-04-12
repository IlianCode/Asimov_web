// Le Referent est aussi un professeur //

const axios = require('axios');
const apiAdresse = "http://localhost:3001";

const ajouter_new_eleve = async (req, res) => {
    if(req.session.referent == 1){
        let mdp = req.body.mdp;
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let pseudo = nom+"."+prenom;
        let Id_Classe = req.body.classe;

        axios({
            method: 'post',
            url: apiAdresse+'/Asimov/api/Ajout_Nouvel_Eleve',
            data: {nom : nom, prenom : prenom, Id_Classe : Id_Classe, pseudo : pseudo, mdp : mdp}
        })
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            res.render("evenement", { msg : "Insertion réussi !", url : "/Asimov/myClasses/"+req.session.Id })     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            res.render("evenement", { msg : "Une erreur est survenue !", url: "/Asimov/myClasses/"+req.session.Id }) 
        })
    }else{
        res.render("refused")
    }
}

// + Controller afficher_classe dans ctrlGlobal //


// Exportation //
module.exports = {
    ajouter_new_eleve
}


