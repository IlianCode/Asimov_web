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
        let sql='SELECT p.idProf, p.nom, p.prenom, m.nom as nomMatiere FROM professeur p INNER JOIN matiere m ON p.Id_Matiere = m.idMatiere WHERE p.Proviseur = 0 ';
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
//supprimer un professeur
const deleteProf = async (idProf) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM professeur WHERE idProf = "+ idProf +";"

        db.query(sql, (err, data, fields) => {
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
//modifier un professeur
const updateProf = async (idProf,pseudo, nom, prenom) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE professeur SET pseudo = ?, nom = ?, prenom = ? WHERE idProf = ?;"

        db.query(sql, [pseudo, nom, prenom, idProf], (err, data, fields) => {
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

//afficher toutes les notes
const getNotes = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT notes.idNote, eleve.nom as nomEleve, eleve.prenom, matiere.nom, notes.note, notes.Titre from notes, matiere, eleve where Id_Matiere = idMatiere and Id_Eleve = idEleve order by idNote;';

        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucune Note trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}

// afficher tous les eleves
const getEleves = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT idEleve, nom, prenom FROM eleve';

        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucun Eleve trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}
// ajouter note avec date choisis par le proviseur
const addNote = async (idEleve, idMatiere, note, date, titre) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO notes (Id_Matiere,Id_Eleve , Titre, dateNote,note ) VALUES (?,?,?,?,?);"
       
        db.query(sql, [idMatiere, idEleve,titre,  date, note], (err, data, fields) => {
            console.log(date);
            if(err){
                console.log(err)
                reject("Une erreur est survenue")
            }else{
                resolve(data)
            }
        })
    })
}

//modifier nom classe 
const updateClasse = async (idClasse, nom) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE classe SET nom = ? WHERE idClasse = ?;"

        db.query(sql, [nom, idClasse], (err, data, fields) => {
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

//supprimer une classe
const deleteClasse = async (idClasse) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM classe WHERE idClasse = "+ idClasse +";"

        db.query(sql, (err, data, fields) => {
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
//créer une nouvelle classe
const newClasse = async (nom) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO classe (nom) VALUES ('"+nom+"');"

        db.query(sql, (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue")
            }else{
                resolve(data)
            }
        })
    })
}
//afificher les eleves
const getElevesProviseur = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT eleve.idEleve, eleve.nom as nomEleve, eleve.prenom ,classe.nom as nomClasse FROM eleve, classe WHERE idClasse = Id_Classe ORDER BY idClasse';

        db.query(sql, (err, data, fields) => {
            if(err || data.length == 0){
                console.log(err)
                reject("Aucun Eleve trouvé !")
            }else{
                resolve(data)
            }
        })
    })
}
// supprimer un eleve 
const deleteEleve = async (idEleve) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM eleve WHERE idEleve = "+ idEleve +";"

        db.query(sql, (err, data, fields) => {
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

//modifier un eleve 
const updateEleve = async (idEleve,pseudo, nom, prenom, idClasse) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE eleve SET pseudo = ?, nom = ?, prenom = ? , Id_Classe = ? WHERE idEleve = ?;"

        db.query(sql, [pseudo, nom, prenom, idClasse, idEleve], (err, data, fields) => {
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
    updateMatiere,
    deleteProf,
    updateProf,
    getNotes,
    getEleves,
    addNote,
    updateClasse,
    deleteClasse,
    newClasse,
    getElevesProviseur,
    deleteEleve,
    updateEleve
}