const db = require('./connexion')

const newEleve = async (pseudo, mdp, nom, prenom, Id_Classe) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO eleve (pseudo, mdp, nom, prenom, Id_Classe) VALUES (?,?,?,?,?);"

        db.query(sql,[pseudo, mdp, nom, prenom, Id_Classe], (err, data, fields) => {
            if(err){
                console.log(err)
                reject("Une erreur est survenue !")
            }else{
                resolve(data)
            }
        })
    })
}

// + Requete getClasse dans modelGlobal.js //

module.exports={
    newEleve
}