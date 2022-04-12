const db = require('./connexion')


// SELECT //

const getClasse_prof = async (idProf) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT cs.idClasse, cs.nom FROM classe cs INNER JOIN cours cr ON cs.idClasse = cr.Id_Classe INNER JOIN professeur pf ON cr.Id_Prof = pf.idProf AND pf.idProf = ?;';
        db.query(sql, idProf, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Classe trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

const getNotes_Matiere = async (idEleve, idProf) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT e.nom, e.prenom, e.idEleve, e.Id_Classe, n.idNote, n.note, n.dateNote, m.idMatiere, m.nom AS nomMatiere, n.Titre FROM notes n';
        sql +=' INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = ? INNER JOIN matiere m ON n.Id_Matiere = m.idMatiere INNER JOIN professeur p ON p.Id_Matiere = m.idMatiere AND p.idProf = ?;'
        db.query(sql, [idEleve, idProf], (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Notes trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

const newNote_Matiere = async (Id_Matiere, Id_Eleve, Titre, note) => {
    return new Promise((resolve, reject) => {
        let sql='INSERT INTO notes (Id_Matiere, Id_Eleve, Titre, DateNote, note) VALUES (?, ?, ?, now(), ?)';
        db.query(sql, [Id_Matiere, Id_Eleve, Titre, note], (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue !")
            }else{
                resolve("Nouvelle note ajoutée !")
            }
        })
    })
}

const deleteNote = async (idNote) => {
    return new Promise((resolve, reject) => {
        let sql='DELETE FROM notes WHERE idNote = ?';
        db.query(sql, idNote, (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue !")
            }else if(data.affectedRows == 0){
                reject("Suppression échouée !")
            }else{
                resolve("Suppression réussi !")
            }
        })
    })
}

// + Requete getEleve_classe dans modelGlobal.js //


module.exports={
    getClasse_prof,
    getNotes_Matiere,
    newNote_Matiere,
    deleteNote
}