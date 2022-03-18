const db = require('./connexion')

//POUR PROFESSEUR //
const createEleve = async (pseudo, mdp, nom, prenom, Id_Classe) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO eleve (pseudo,mdp, nom,prenom,Id_Classe) VALUES (?,?,?,?,?);"

        db.query(sql,[pseudo, mdp, nom, prenom, Id_Classe], (err, data, fields) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

module.exports={
    createEleve
}