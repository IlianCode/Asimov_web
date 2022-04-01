const db = require('./connexion')


// SELECT //

const getNotes_Eleve = async (idEleve, Id_Eleve) => { // aussi modelProviseur
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
    getNotes_Eleve,
}