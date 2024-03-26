const express = require("express");
const secure = require("../middlewares/auth.middleware");
const user = require("../controllers/users.controller");
const band = require("../controllers/bands.controller");
const comunity = require("../controllers/comunity.controller");
const message = require("../controllers/message.controller");
const index = require("../controllers/index.controller");

const router = express.Router();

//user
router.get("/reglog", user.reglog);
router.post("/register", user.doRegister);
router.post("/login", user.doLogin);
router.get("/logout", user.logout);
router.get("/profile", secure.isAuthenticated, user.profile);
router.get("/user/:id/edit", secure.isAuthenticated, user.edit);
router.post("/user/:id/edit", secure.isAuthenticated, user.doEdit);
router.post("/user/:id/delete", secure.isAuthenticated, user.delete);
router.post("/pendingMembers/:id/accept", secure.isAuthenticated, user.acceptNewMember);
router.post("/pendingMembers/:id/decline", secure.isAuthenticated, user.removeNewMember);
router.get("/user/:id/removeMember", secure.isAuthenticated, user.removeMember); //Ruta get para eliminar a un miembro de la banda
router.post("/search", user.search);

//Band
router.get("/createBand", band.create);
router.post("/createBand", band.doCreate);
router.get("/bands", band.listBands);
router.get("/band/:id/detail", band.details);
router.post("/joinBand/:id", secure.isAuthenticated, band.joinBand);
router.get("/band/:id/edit", secure.isAuthenticated, band.bandEdit);
router.post("/band/:id/detail", secure.isAuthenticated, band.bandDoEdit);
router.post("/band/:id/delete", secure.isAuthenticated, band.delete)

//Rating
router.post("/rating", band.rating);

//Comunity
router.get("/comunity", comunity.list);

router.get("/bandjam", comunity.bandjam);
router.get("/bandjamForm", comunity.bandjamForm);
router.post("/bandjamForm", comunity.doBandjamForm);
router.get("/bandjam/:id/edit", secure.isAuthenticated, comunity.bandjamEdit);
router.post("/bandjam/:id/edit", secure.isAuthenticated, comunity.bandjamDoEdit);
router.post("/bandjam/:id/delete", secure.isAuthenticated, comunity.bandjamDelete);
router.get("/bandjam/:id/details", comunity.bandjamDetails);

router.get("/formarbanda", comunity.formarbanda);
router.get("/formarBandaForm", comunity.formarBandaForm);
router.post("/formarBandaForm", comunity.doFormarBandaForm);
router.get("/formarBanda/:id/edit", secure.isAuthenticated, comunity.formarBandaEdit);
router.post("/formarBanda/:id/edit", secure.isAuthenticated, comunity.formarBandaDoEdit);
router.post("/formarBanda/:id/delete", secure.isAuthenticated, comunity.formarBandaDelete);
router.get("/formarBanda/:id/details", comunity.formarBandaDetails);

router.get("/anunciatuconcierto", comunity.anunciatuconcierto);
router.get("/anunciaTuConciertoForm", comunity.anunciaTuConciertoForm);
router.post("/anunciaTuConciertoForm", comunity.doAnunciaTuConciertoForm);
router.get("/anunciatuconcierto/:id/edit", secure.isAuthenticated, comunity.anunciatuconciertoEdit);
router.post("/anunciatuconcierto/:id/edit", secure.isAuthenticated, comunity.anunciatuconciertoDoEdit);
router.post("/anunciatuconcierto/:id/delete", secure.isAuthenticated, comunity.anunciatuconciertoDelete);
router.get("/anunciatuconcierto/:id/details", comunity.anunciatuconciertoDetails);


//Message
router.post("/message/:id/message", message.doCreate);
router.get("/message/:id/edit", message.messageEdit);
router.post("/message/:id/edit", message.messageDoEdit);
router.post("/message/:id/delete", message.messageDelete);

router.get("/", index.index);
module.exports = router;

