const express = require("express");
const user = require("../controllers/users.controller");
const secure = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/reglog", user.reglog);
router.post("/register", user.doRegister);
router.post("/login", user.doLogin);
router.get("/logout", user.logout);
router.get("/profile", secure.isAuthenticated, user.profile);
router.get("/user/:id/edit", user.edit);
router.post("/user/:id/edit", user.doEdit);
router.post("/user/:id/delete", user.delete);


router.get("/", (req, res, next) => res.render("index"));
module.exports = router;

