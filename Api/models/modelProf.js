const db = require('./connexion')


// SELECT //

const Authentification = async (table, pseudo, mdp) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT * FROM'
        if (table == 1){
            sql +=' eleve WHERE pseudo = ? AND mdp = ?';
        }else if(table == 2){
            sql +=' professeur WHERE pseudo = ? AND mdp = ?';
        }else{
            sql +=' proviseur WHERE pseudo = ? AND mdp = ?';
        }
        db.query(sql, [pseudo, mdp], (err, data, fields) => {
            if(data.length == 0){
                resolve("Pseudo ou mot de passe incorrect !")
            }
            if(err){
                console.log(err)
                reject("Erreur lors de l'authentification !")
            }else{
                resolve(data)
            }
        })
    })
}

// POUR PROFESSEUR //
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

const getEleve_classe = async (idClasse) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT e.idEleve AS idEleve, CONCAT(e.nom, " ", e.prenom) AS Nom, FROM eleve e INNER JOIN classe c ON c.idClasse = e.Id_Classe WHERE e.Id_Classe = ? order by nom, prenom;';
        db.query(sql, idClasse, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucun Eleve trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

const getNotes_Matiere = async (idEleve, idProf) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT CONCAT(e.nom, " ", e.prenom) AS Nom, e.idEleve AS idEleve, n.idNote AS idNote, n.note AS note, m.idMatiere AS idMatiere FROM notes n';
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
            if(err || data.length == 0){
                console.log(err)
                reject("Une erreur est survenue !")
            }else{
                resolve(data)
            }
        })
    })
}

const modifNote_Matiere = async (Id_Matiere, Id_Eleve, Titre, note, idNote) => {
    return new Promise((resolve, reject) => {
        let sql='UPDATE notes SET Id_Matiere = ?, Id_Eleve = ? , Titre = ?, DateNote = now(), note = ? WHERE idNote = ?';
        db.query(sql, [Id_Matiere, Id_Eleve, Titre, note, idNote], (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Une erreur est survenue !")
            }else{
                resolve(data)
            }
        })
    })
}
// FIN PROFESSEUR //


module.exports={
    Authentification,
    getClasse_prof,
    getEleve_classe,
    getNotes_Matiere,
    newNote_Matiere,
    modifNote_Matiere
}