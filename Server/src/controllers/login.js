const axios = require("axios");
const users = require("../utils/users");

const login = (req, res) => {
    const { email, password } = req.query

    return (users.some(e => (e.email === email && e.password === password)))
        ? res.status(200).send([{ "access": true }])
        : res.status(200).send([{ "access": false }])
};

module.exports = {
    login
};