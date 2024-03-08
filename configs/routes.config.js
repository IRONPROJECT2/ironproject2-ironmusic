const express = require("express");
const user = require("../controllers/users.controller");

const router = express.Router();

router.get("/reglog", user.reglog);
router.post("/register", user.doRegister);






router.get("/", (req, res, next) => res.render("index"));
module.exports = router;

