const db = require('./connexion')

// POUR : Toutes connexion //
const Authentification = async (table, pseudo, mdp) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT * FROM'
        if (table == 1){
            sql +=' eleve WHERE pseudo = ? AND mdp = ?';
        }else{
            sql +=' professeur WHERE pseudo = ? AND mdp = ?';
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

// POUR : Eleve et Proviseur //
const getNotes_Eleve = async (idEleve, Id_Eleve) => {
    return new Promise((resolve, reject) => {
        let sql='SELECT idNote, idMatiere, Matiere, Nom, note, date, titre, Moyenne FROM ( ' +
                 'SELECT null AS idNote, m.idMatiere AS idMatiere, m.nom AS Matiere, CONCAT(e.nom, " ", e.prenom) AS Nom, null AS note, null AS date, null AS titre, Round(avg(n.note),2) AS Moyenne FROM notes n ' +
                 'INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere ' +
                 'INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = ? ' +
                 'GROUP BY Matiere, Nom ' +
                
                 'UNION ' +
            
                 'SELECT n.idNote AS idNote, m.idMatiere AS idMatiere, m.nom AS Matiere, CONCAT(e.nom, " ", e.prenom) AS Nom, n.note AS note, n.dateNote AS date, n.Titre AS titre, null AS Moyenne FROM notes n ' +
                 'INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere ' +
                 'INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = ? ' +
                 ') AS OK;';
        db.query(sql, [idEleve, Id_Eleve], (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Notes trouvé !")
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

/*SELECT m.idMatiere, m.nom AS Matiere, CONCAT(e.nom, " ", e.prenom) AS Nom, Round(avg(n.note),2) AS Moyenne FROM notes n
INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere
INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = 8
GROUP BY Matiere, Nom;

SELECT m.nom AS Matiere, CONCAT(e.nom, " ", e.prenom) AS Nom, n.note, n.dateNote, n.Titre FROM notes n
INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere
INNER JOIN eleve e ON e.idEleve = n.Id_Eleve And e.idEleve = 2;*/



/* SELECT idNote, idMatiere, Matiere, Nom, note, date, titre, Moyenne FROM ( 
SELECT null AS idNote, m.idMatiere AS idMatiere, m.nom AS Matiere, CONCAT(e.nom, " ", e.prenom) AS Nom, null AS note, null AS date, null AS titre, Round(avg(n.note),2) AS Moyenne 
FROM notes n 
INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere
INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = 2
GROUP BY Matiere, Nom
                
UNION
            
SELECT n.idNote AS idNote, m.idMatiere AS idMatiere, m.nom AS Matiere, CONCAT(e.nom, " ", e.prenom) AS Nom, n.note AS note, n.dateNote AS date, n.Titre AS titre, null AS Moyenne 
FROM notes n
INNER JOIN matiere m ON m.idMatiere = n.Id_Matiere
INNER JOIN eleve e ON e.idEleve = n.Id_Eleve AND e.idEleve = 2)
AS OK; */


module.exports={
    Authentification,
    getClasse,
    getEleve_classe,
    getNotes_Eleve,
    modifNote
}