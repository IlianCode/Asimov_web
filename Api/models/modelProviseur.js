const db = require('./connexion')

const getMatiere = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT idMatiere, nom FROM matiere';
        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Matiere trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

const getProf = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT p.idProf, CONCAT(p.nom, " ", p.prenom) AS Nom, m.IdMatiere FROM professeur p INNER JOIN matiere m ON m.idMatiere = p.Id_MatiereWHERE p.Proviseur = 0;';
        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Matiere trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

const newMatiere = async (nom) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO matiere (nom) VALUES (?);"

        db.query(sql, nom, (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue")
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

module.exports={
    getMatiere,
    newMatiere,
}