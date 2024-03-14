const express = require("express");
const secure = require("../middlewares/auth.middleware");
const user = require("../controllers/users.controller");
const band = require("../controllers/bands.controller");
const comunity = require("../controllers/comunity.controller");

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
router.post("/pendingMembers/:id/accept", user.acceptNewMember);
router.post("/pendingMembers/:id/decline", user.removeNewMember);
router.get("/user/:id/removeMember", user.removeMember); //Ruta get para eliminar a un miembro de la banda

//Band
router.get("/createBand", band.create);
router.post("/createBand", band.doCreate);
router.get("/bands", band.listBands);
router.get("/band/:id/detail", band.details);
router.post("/joinBand/:id", band.joinBand);

//Comunity
router.get("/comunity", comunity.list);
router.get("/bandjam", comunity.bandjam);
router.get("/formarbanda", comunity.formarbanda);
router.get("/anunciatuconcierto", comunity.anunciatuconcierto);

router.get("/bandjamForm", comunity.bandjamForm);
router.post("/bandjamForm", comunity.doBandjamForm);
router.get("/formarBandaForm", comunity.formarBandaForm);
router.post("/formarBandaForm", comunity.doFormarBandaForm);
router.get("/anunciaTuConciertoForm", comunity.anunciaTuConciertoForm);
router.post("/anunciaTuConciertoForm", comunity.doAnunciaTuConciertoForm);

router.get("/", (req, res, next) => res.render("index"));
module.exports = router;

