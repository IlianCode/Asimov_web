const db = require('./connexion')

const getClasse = async () => { // pour referent et proviseur
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