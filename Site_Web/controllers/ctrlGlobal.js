const axios = require('axios');
const apiAdresse = "http://localhost:3001";

// Affichage Menu //
const page_de_connexion = (req, res) => { // (POUR : Tout le monde) //
    req.session.table = 1;
    res.render('pageConnexion')
}

const deconnexion = (req, res) => { // (POUR : Tout le monde) //
    req.session.table = undefined;
    req.session.referent = undefined;
    req.session.proviseur = undefined;
    req.session.Id = undefined;
    res.render('pageConnexion')
}

const Connexion = async (req, res) => { // (POUR : Tout le monde) //
    let table = req.body.table;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;

    await axios({
        method: 'post',
        url: apiAdresse+'/Asimov/api/Authentification',
        data: {table : table, pseudo : pseudo, mdp : mdp}
    })
    .then((reponse) => {
        //On traite la suite une fois la réponse obtenue
        let data = reponse.data[0];
        req.session.table = table;
        if(table != 1){
            idProf = data.idProf;
            req.session.Id = idProf;
            req.session.proviseur = 0;
            req.session.referent = 0;
            if(data.Proviseur == 1){
                req.session.proviseur = data.Proviseur;
                res.redirect("/Asimov/Classes")
            }else{
                req.session.referent = data.Referent;
                res.redirect("/Asimov/myClasses/"+idProf)
            }
        }else{
            console.log('connecté !')
            id = data.idEleve;
            req.session.Id = id;
            res.redirect("/Asimov/Notes/Eleve/"+id)
        }
    })
    .catch((erreur) => {
        //On traite ici les erreurs éventuellement survenues
        res.render('pageConnexion', {err : 1, msgErreur : "Erreur lors de l'authentification !"})
    })
}


const afficher_classe = async (req, res) => { // (POUR : Référent et Proviseur) //
    if(req.session.table != 1 && (req.session.proviseur == 1 || req.session.referent == 1)){
        await axios.get(apiAdresse+'/Asimov/api/Classes')
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                let data = reponse.data;
                
                if(req.session.proviseur == 1){
                    res.render('listeClasses', {classes : data, id : req.session.Id})
                }else{
                    res.render('formNewEleve', {classes : data, id : req.session.Id})
                }
            })
            .catch((err) => {
                //On traite ici les erreurs éventuellement survenues
                console.log('ALED');
                if(req.session.proviseur == 1){
                    res.render('listeClasses', {err : err})
                }else{
                    res.render('formNewEleve', {err : err})
                }
            })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        };
    }
}


const afficher_details_classe = async (req, res) => { // (POUR : Professeur et Proviseur) //
    let idClasse = req.params.idClasse;
    let idProf = req.params.idProf;
    if (req.session.Id != idProf){
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }else{
        if(req.session.proviseur == 1){
            req.session.autorised = true;
        }else if(req.session.table != 1){
            await axios.get(apiAdresse+'/Asimov/api/Classes/'+idProf)
                .then((reponse) => {
                    //On traite la suite une fois la réponse obtenue
                    let data = reponse.data;
                    req.session.idAccess = [];
                    for (let y = 0;y < data.length; y++){
                        req.session.idAccess.push(data[y].idClasse)
                    }
                    let idClasse = req.params.idClasse;
                    req.session.autorised = false;
                    for (let i = 0; i < req.session.idAccess.length; i++){
                        if (idClasse == req.session.idAccess[i]){
                            req.session.autorised = true;
                        }
                    }
                })
                .catch((err) =>{
                    console.log('ALED');
                    if(req.session.referent == 1){
                        res.render('mesClasses', {err : "Aucune classes trouvé !", idProf : req.session.Id, ref : true})
                    }else{
                        res.render('mesClasses', {err : "Aucune classes trouvé !", idProf : req.session.Id, ref : false})
                    }
                })
        }
        if (req.session.autorised == true){ 
            await axios.get(apiAdresse+'/Asimov/api/Eleves_Classe/'+idClasse)
                .then((reponse) => {
                    //On traite la suite une fois la réponse obtenue
                    let data = reponse.data;
                    
                    if(req.session.referent == 1){
                        res.render("eleveClasse", {eleves : data, idProf : req.session.Id, ref : true, prov : false})
                    }else if (req.session.proviseur == 1){
                        res.render("eleveClasse", {eleves : data, idProf : req.session.Id, ref : false, prov : true})
                    }else{
                        res.render("eleveClasse", {eleves : data, idProf : req.session.Id, ref : false, prov : false})
                    }
                })
                .catch((err) =>{
                    console.log('ALED');
                    if(req.session.referent == 1){
                        res.render("eleveClasse", {err : "Aucun Elève trouvé !", idProf : req.session.Id, ref : true})
                    }else if (req.session.proviseur == 1){
                        res.render("eleveClasse", {eleves : data, idProf : req.session.Id, ref : false, prov : true})
                    }else{
                        res.render("eleveClasse", {err : "Aucun Elève trouvé !", idProf : req.session.Id, ref : false})
                    }
                })
        }else{
            if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
        }
    }
}

const formulaire_modif_note = async (req, res) => { // (POUR : Professeur et Proviseur) //
    if (req.session.table != 1){
        let idNote = req.params.idNote;
        let idEleve = req.params.idEleve; 
        let idClasse = req.params.idClasse;
        if (req.session.referent == 1){
            res.render("formModifNote", { idNote : idNote, idEleve : idEleve, idClasse : idClasse, ref : true })
        }else{
            res.render("formModifNote", { idNote : idNote, idEleve : idEleve, idClasse : idClasse, ref : false })
        }
    }else{
        res.render("refused.ejs")
    }
    
}

const modifier_note_eleve = async (req, res) => { // (POUR : Professeur et Proviseur) //
    if (req.session.proviseur == 1){
        req.session.autorised = true;
    }else if (req.session.table != 1){
        let idClasse = req.body.idClasse;
        req.session.autorised = false;
        for (let i = 0; i < req.session.idAccess.length; i++){
            if (idClasse == req.session.idAccess[i]){
                req.session.autorised = true;
            }
        }
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
    if (req.session.autorised == true){
        let idNote = req.body.idNote;
        let note = req.body.note;
        let idEleve = req.body.idEleve;
        await axios({
            method: 'post',
            url: apiAdresse+'/Asimov/api/modif_Notes',
            data: {idNote : idNote, note : note}
        })
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            if (req.session.proviseur == 1){
                res.render("evenement", { msg : "Modification réussi !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })
            }else{
                res.render("evenement", { msg : "Modification réussi !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })
            }     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            if (req.session.proviseur == 1){
                res.render("evenement", { msg : "Une erreur est survenue !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })
            }else{
                res.render("evenement", { msg : "Une erreur est survenue !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve }) 
            }
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
}

const supprimer_note_eleve_matiere = async (req, res) => { // (POUR : Professeur et Proviseur) //
    if (req.session.proviseur == 1){
        req.session.autorised = true;
    }else if (req.session.table != 1){
        let idClasse = req.params.idClasse;
        req.session.autorised = false;
        for (let i = 0; i < req.session.idAccess.length; i++){
            if (idClasse == req.session.idAccess[i]){
                req.session.autorised = true;
            }
        }
        
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        }
    }
    if (req.session.autorised == true){
        let idEleve = req.params.idEleve;
        let idNote = req.params.idNote;

        await axios.get(apiAdresse+'/Asimov/api/Suppr_Notes_Matiere/'+idNote)
        .then((reponse) => {
            //On traite la suite une fois la réponse obtenue
            if (req.session.proviseur == 1){
                res.render("evenement", { msg : "Suppression réussi !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })
            }else{
                res.render("evenement", { msg : "Suppression réussi !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })
            }     
        })
        .catch((erreur) => {
            //On traite ici les erreurs éventuellement survenues
            if (req.session.proviseur == 1){
                res.render("evenement", { msg : "Une erreur est survenue !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve })
            }else{
                res.render("evenement", { msg : "Une erreur est survenue !", url : "/Asimov/Notes_Matiere/"+req.session.Id+"/"+idEleve }) 
            }
        })
    }else{
        if (req.session.Id > 0){
            res.render("refused")
       }else{
            res.render("refused", {err : true})
        } 
    }
}

// Exportation //
module.exports = {
    page_de_connexion,
    deconnexion,
    Connexion,
    afficher_classe,
    afficher_details_classe,
    formulaire_modif_note,
    modifier_note_eleve,
    supprimer_note_eleve_matiere
}