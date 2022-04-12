const axios = require('axios');
const apiAdresse = "http://localhost:3001";

const afficher_note_eleve_matiere = async (req, res) => {
    let idProf = req.params.idProf;
    let idEleve = req.params.idEleve;
    
    if (idProf == req.session.Id && req.session.table != 1 && req.session.proviseur != 1){
        await axios.get(apiAdresse+'/Notes_Matiere/'+idProf+'/'+idEleve)
            .then((reponse) => {
                //On traite la suite une fois la réponse obtenue
                let data = reponse.data; 
                req.session.autorised = false;
                for (let i = 0; i < req.session.idAccess.length; i++){
                    if (data.idClasse == req.session.idAccess[i]){
                        req.session.autorised = true;
                    }
                }
                if (req.session.autorised == true){
                    if(req.session.referent == 1){
                        res.render('notesMatieres', {data : data, idProf : idProf, ref : true})
                    }else{
                        res.render('notesMatieres', {data : data, idProf : idProf, ref : false})
                    }
                }else{
                    res.render("refused")
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
    }else{
        res.render("refused")
    }
}

const ajouter_note_eleve_matiere = async (req, res) => {

    let idMatiere = req.params.idMatiere;
    let idEleve = req.params.idEleve;
    let titre = req.params.titre;
    let note = req.params.note;

    await db.newNote_Matiere(idMatiere, idEleve, titre, note)
    .then((data) => {
        let err = false;
        console.log(data)
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
}

const supprimer_note_eleve = async (req, res) => {

    let idNote= req.params.idNote;

    await db.deleteNote(idNote)
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
    afficher_note_eleve_matiere,
    ajouter_note_eleve_matiere,
    supprimer_note_eleve
}




