const express = require("express");
const secure = require("../middlewares/auth.middleware");
const user = require("../controllers/users.controller");
const band = require("../controllers/bands.controller");
const comunity = require("../controllers/comunity.controller");
const message = require("../controllers/message.controller");

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
router.get("/bandjamForm", comunity.bandjamForm);
router.post("/bandjamForm", comunity.doBandjamForm);
router.get("/bandjam/:id/edit", comunity.bandjamEdit);
router.post("/bandjam/:id/edit", comunity.bandjamDoEdit);
router.post("/bandjam/:id/delete", comunity.bandjamDelete);
router.get("/bandjam/:id/details", comunity.bandjamDetails);

router.get("/formarbanda", comunity.formarbanda);
router.get("/formarBandaForm", comunity.formarBandaForm);
router.post("/formarBandaForm", comunity.doFormarBandaForm);
router.get("/formarBanda/:id/edit", comunity.formarBandaEdit);
router.post("/formarBanda/:id/edit", comunity.formarBandaDoEdit);
router.post("/formarBanda/:id/delete", comunity.formarBandaDelete);
router.get("/formarBanda/:id/details", comunity.formarBandaDetails);

router.get("/anunciatuconcierto", comunity.anunciatuconcierto);
router.get("/anunciaTuConciertoForm", comunity.anunciaTuConciertoForm);
router.post("/anunciaTuConciertoForm", comunity.doAnunciaTuConciertoForm);
router.get("/anunciatuconcierto/:id/edit", comunity.anunciatuconciertoEdit);
router.post("/anunciatuconcierto/:id/edit", comunity.anunciatuconciertoDoEdit);
router.post("/anunciatuconcierto/:id/delete", comunity.anunciatuconciertoDelete);
router.get("/anunciatuconcierto/:id/details", comunity.anunciatuconciertoDetails);


//Message
//router.post("/bandjam/:id/message", message.bandjamMessage);


router.get("/", (req, res, next) => res.render("index"));
module.exports = router;

