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
        let sql='SELECT p.idProf, CONCAT(p.nom, " ", p.prenom) AS Nom, m.IdMatiere FROM professeur p INNER JOIN matiere m ON m.idMatiere = p.Id_Matiere WHERE p.Proviseur = 0;';
        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucun Professeur trouvé !")
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

const newProf = async (pseudo, mdp, nom, prenom, idMatiere) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO professeur (pseudo, mdp, nom, prenom, Id_Matiere) VALUES (?,?,?,?,?);"

        db.query(sql, [pseudo, mdp, nom, prenom, idMatiere], (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue")
            }else{
                resolve(data)
            }
        })
    })
}

//supprimer une matiere
const deleteMatiere = async (idMatiere) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM matiere WHERE idMatiere = ?;"

        db.query(sql, idMatiere, (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue")
            }else if(data.affectedRows == 0){
                reject("Suppression échouée")
            }else{
                resolve("Suppression réussi")
            }
        })
    })
}
//modifier une matiere 
const updateMatiere = async (idMatiere, nom) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE matiere SET nom = ? WHERE idMatiere = ?;"

        db.query(sql, [nom, idMatiere], (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue")
            }else if(data.affectedRows == 0){
                reject("Modification échouée")
            }else{
                resolve("Modification réussi")
            }
        })
    })
}

module.exports={
    getMatiere,
    getProf,
    newMatiere,
    newProf,
    deleteMatiere,
    updateMatiere
}