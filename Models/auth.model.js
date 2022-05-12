const fs = require('fs');
const path = require('path');




module.exports = class User {

  constructor(user){
    this.user = user;
  }

  // for saving a user
  save(){
    return new Promise(async (resolve, reject) =>{
      const pt = path.join(__dirname,
        '..' ,
        'data.json'
      );
      fs.readFile(pt,'utf8', (err, fileContent) => {
        let user = [];
        if(err){
          reject(err);
        }
        user = JSON.parse(fileContent);
        user.push(this.user);
        fs.writeFile(pt, JSON.stringify(user), (err) =>{
          if(err){
            reject(err);
          }
          resolve(this.user);
        })
      })
    })
  }

  // find a user by username

  static findByUsername(uname) {

    return new Promise((resolve, reject) =>{
      const pt = path.join(__dirname,
        '..' ,
        'data.json'
      );
      fs.readFile(pt,'utf8', (err, fileContent) => {
        let users = [];
        if(err){
          reject(err);
        }

        if(fileContent.length > 0){
          users = JSON.parse(fileContent);
        }else{
          fs.writeFile(pt, "[]", (err) =>{
            if(err){
              reject(err);
            }
          })
        }
        
        const hasUser = users.find(obj => obj.username === uname)
        if(hasUser === undefined){
          resolve(null)
        }else{
          resolve(hasUser)
        }
      })
    })


  }

}