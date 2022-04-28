const db = require('./connexion')

// POUR : Toutes connexion //
const Authentification = async (table, pseudo, mdp) => {
    return new Promise((resolve, reject) => {
        let sql;
        if (table == 1){
            sql='SELECT idEleve, nom, prenom FROM eleve WHERE pseudo = ? AND mdp = ?';
        }else{
            sql='SELECT idProf, nom, prenom, Referent, Proviseur FROM professeur WHERE pseudo = ? AND mdp = ?';
        }
        db.query(sql, [pseudo, mdp], (err, data, fields) => {
            if(data.length == 0){
                reject()
            }
            if(err){
                console.log(err)
                reject("Erreur lors de l'authentification !")
            }else{
                resolve(data)
            }
        })
    });
}

// POUR : Référent et Proviseur //
const getClasse = async () => { 
    return new Promise((resolve, reject) => {
        let sql='SELECT idClasse, nom FROM classe';
        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Classe trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

// POUR : Professeur et Proviseur //
const getEleve_classe = async (idClasse) => { 
    return new Promise((resolve, reject) => {
        let sql='SELECT idEleve, nom, prenom from eleve where Id_Classe =? ORDER BY idEleve, nom, prenom;';
        db.query(sql, idClasse, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject()
            }else{
                resolve(data)
            }
        })
    })
}

// POUR : Eleve et Proviseur //
const getNotes_Eleve = async (idEleve, Id_Eleve) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT Id_Classe, idNote, idMatiere, Matiere, nom, prenom, note, date, titre, Moyenne FROM ( ' +
                 'SELECT e.Id_Classe AS Id_Classe, null AS idNote, m.idMatiere AS idMatiere, m.nom AS Matiere, e.nom, e.prenom, null AS note, null AS date, null AS titre, Round(avg(n.note),2) AS Moyenne FROM notes n ' +
                 'INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere ' +
                 'INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = ? ' +
                 'GROUP BY Matiere, Nom ' +
                
                 'UNION ' +
            
                 'SELECT e.Id_Classe AS Id_Classe, n.idNote AS idNote, m.idMatiere AS idMatiere, m.nom AS Matiere, e.nom AS nom, e.prenom AS prenom, n.note AS note, DATE_FORMAT(n.dateNote, "%Y/%m/%d") AS date, n.Titre AS titre, null AS Moyenne FROM notes n ' +
                 'INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere ' +
                 'INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = ? ' +
                 ') AS OK;';
        db.query(sql, [idEleve, Id_Eleve], (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                err = {msgErreur : "Aucune notes trouvé !"};
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

// POUR : Professeur et Proviseur
const modifNote = async (note, idNote) => {
    return new Promise((resolve, reject) => {
        let sql='UPDATE notes SET note = ? WHERE idNote = ?';
        db.query(sql, [note, idNote], (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue !")
            }else if(data.changedRows == 0){
                reject("Modification échouée !")
            }else{
                resolve("Modification réussi !")
            }
        })
    })
}

module.exports={
    Authentification,
    getClasse,
    getEleve_classe,
    getNotes_Eleve,
    modifNote
}