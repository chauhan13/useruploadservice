const db = require("../configuration/connection");



class filesRepository {

    async getAllfilesUser(user_id){
       const [files] = await db.query("SELECT * FROM files WHERE user_id = ?", [user_id]);
       return files;
    }


    async deleteFileUser(id, user_id){
        const [file] = await db.query("SELECT * FROM files WHERE id = ? AND user_id = ?", [
            id,
            user_id,
          ]);

          return file;
    }
}

module.exports = new filesRepository();
