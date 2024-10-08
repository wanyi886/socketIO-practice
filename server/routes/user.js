const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { users } = require("../db.json");

const bcrypt = require("bcryptjs");

module.exports = function(io) {

    router.get('/', function(req, res, next) {
        res.send(users);
    })

    router.put("/:id/password", function(req, res, next){
        
        const user_id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        const userIndex = users.findIndex( user => user.id === user_id);

        if (userIndex === -1) {
            return res.status(404).send("Cannot find the user.")
        }

        const user = users[userIndex];

        const match = bcrypt.compare(currentPassword, user.hashedPassword);

        if (!match) return res.status(401).send({ message: "Password you entered is incorrect."})


        const newHash = bcrypt.hashSync(newPassword, process.env.SALT);

        users[userIndex].password = newPassword;
        users[userIndex].hashedPassword = newHash;

        const jsonData = JSON.stringify({ "users": users }, null, 2)

        fs.writeFile(path.join(__dirname, "../db.json"), jsonData, (err) => {
            if (err) {
                console.error("Error updating password", err);
                return res.status(500).send("Internal server error")
            }

            req.session.token = newHash; // to reproduce the issue, doesn't expire the session, only update token
            console.log("sessionid", req.session.id)
            io.emit('sessionUpdate', { userId: req.session.user_id, });
            res.json({ message: "Password Updated!", session_id: req.session.id, session: req.session })
        })
        
    })

    return router
}

// module.exports = router;