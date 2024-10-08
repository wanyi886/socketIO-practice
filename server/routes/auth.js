const express = require('express');
const router = express.Router();
const { users } = require("../db.json");
const bcrypt = require("bcryptjs");



router.post("/", function(req, res, next){
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send("Please enter email and password.")

    const user = users.find( user => user.email === email);

    console.log(users)

    if (!user){
        return res.status(401).send("Invalid email.")
    }


    bcrypt.compare(password, user.hashedPassword, (err, result) => {


        if(err) {
            console.error("Error comparing passwords:", err);
            return
        }

        if (!result) {
            res.status(401).send({ message: "Invalid password."})
            return
        }

        req.session.user_id = user.id;
        req.session.token = user.hashedPassword;
        console.log("session_id", req.session.id)
        console.log("session", req.session);

        res.send({ user_id: user.id, username: user.handle, session_id: req.session.id, session: req.session });
    })
    

})

router.delete("/", function(req, res, next){
    req.session.destroy();
    res.status(200)
       .send("Logged Out!")
})



module.exports = router;