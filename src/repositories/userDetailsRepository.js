const db = require("../configuration/connection");

 class userEntity {

    async getUserDetails(email){
        const [rows] = await db.query("SELECT * FROM users_entity WHERE email = ?", [email]);
        return rows
    }

    async registerUser(email,hashedPassword){
        await db.query("INSERT INTO users_entity (email, password) VALUES (?, ?)", [email, hashedPassword]);
    }
}

module.exports = new userEntity();