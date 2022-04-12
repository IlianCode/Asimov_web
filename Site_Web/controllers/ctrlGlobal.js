const axios = require('axios');
const apiAdresse = "http://localhost:3001";

// Affichage Menu //
const page_de_connexion = (req, res) => {
    req.session.table = 1;
    res.render('pageConnexion')
}

const deconnexion = (req, res) => {
    req.session.table = undefined;
    req.session.referent = undefined;
    req.session.proviseur = undefined;
    req.session.Id = undefined;
    res.render('pageConnexion')
}

const Connexion = (req, res) => {
    let table = req.body.table;
    let pseudo = req.body.pseudo;
    let mdp = req.body.mdp;

    axios({
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
            res.redirect("/Asimov/Eleve/mesNotes/"+id)
        }
    })
    .catch((erreur) => {
        //On traite ici les erreurs éventuellement survenues
        res.render('pageConnexion', {err : 1, msgErreur : "Aucune classe trouvé !"})
    })
}




// POUR : Référent et Proviseur //
const afficher_classe = (req, res) => {
    if(req.session.table != 1 && (req.session.proviseur == 1 || req.session.referent == 1)){
        axios.get(apiAdresse+'/Asimov/api/Classes')
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                let data = reponse.data;
                console.log(data)
                if(req.session.proviseur == 1){
                    res.render('listeClasses', {classes : data})
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
        res.render("refused");
    }
}

const afficher_classe_prof = async (req, res) => {
    let id = req.params.id;
    if(req.session.table != 1 && req.session.proviseur != 1 && id == req.session.Id){
        axios.get(apiAdresse+'/Asimov/api/Classes/'+id)
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                let data = reponse.data;
                if(req.session.referent == 1){
                    res.render('mesClasses', {classes : data, idProf : req.session.Id, ref : true})
                }else{
                    res.render('mesClasses', {classes : data, idProf : req.session.Id, ref : false})
                }
            })
            .catch((err) => {
                //On traite ici les erreurs éventuellement survenues
                console.log('ALED');
                res.render('mesClasses', {err : "Aucune classes trouvé !", idProf : req.session.Id, ref : true})
            })
    }else{
        res.render("refused");
    }
}

// POUR : Professeur et Proviseur //
const afficher_details_classe = async (req, res) => {
    let idClasse = req.params.idClasse;
    if(req.session.proviseur == 1){
        req.session.autorised = true;
    }
    else if(req.session.table != 1){
        let idProf = req.params.idProf
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
                console.log(data)
                if(req.session.referent == 1){
                    res.render("eleveClasse", {eleves : data, idProf : req.session.Id, ref : true})
                }else{
                    res.render("eleveClasse", {eleves : data, idProf : req.session.Id, ref : false})
                }
            })
            .catch((err) =>{
                console.log('ALED');
                if(req.session.referent == 1){
                    res.render("eleveClasse", {err : "Aucun Elève trouvé !", idProf : req.session.Id, ref : true})
                }else{
                    res.render("eleveClasse", {err : "Aucun Elève trouvé !", idProf : req.session.Id, ref : false})
                }
            })
    }else{
        res.render("refused")
    }

}

// POUR : Eleve et Proviseur //
const afficher_note_eleve = async (req, res) => {
    let idProf = req.params.idProf;
    let idEleve = req.params.idEleve;

    req.session.autorised = false;
    for (let i = 0; i < req.session.idAccess.length; i++){
        if (idClasse == req.session.idAccess[i]){
            req.session.autorised = true;
        }
    }

    
}

// POUR : Professeur et Proviseur //
const modifier_note_eleve = async (req, res) => {

    let note = req.params.note;
    let idNote= req.params.idNote;

    await db.modifNote(note, idNote)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

// Exportation //
module.exports = {
    page_de_connexion,
    deconnexion,
    Connexion,
    afficher_classe,
    afficher_classe_prof,
    afficher_details_classe,
    afficher_note_eleve,
    modifier_note_eleve
}