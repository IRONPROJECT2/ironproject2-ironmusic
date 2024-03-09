const express = require("express");
const secure = require("../middlewares/auth.middleware");
const user = require("../controllers/users.controller");
const band = require("../controllers/bands.controller");

const router = express.Router();

//user
router.get("/reglog", user.reglog);
router.post("/register", user.doRegister);
router.post("/login", user.doLogin);
router.get("/logout", user.logout);
router.get("/profile", secure.isAuthenticated, user.profile);
router.get("/user/:id/edit", user.edit);
router.post("/user/:id/edit", user.doEdit);
router.post("/user/:id/delete", user.delete);

//Band
router.get("/createBand", band.create);
router.post("/createBand", band.doCreate);
router.get("/bands", band.listBands);


router.get("/", (req, res, next) => res.render("index"));
module.exports = router;

