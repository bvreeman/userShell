const router = require("express").Router();
const apiRoutes = require("./api");
const contactFormRoutes = require("./contactForm");
// const applicationFormRoutes = require("./applicationRoute")

// Routes
router.use("/api", apiRoutes);
router.use("/contactForm/send", contactFormRoutes)
// router.use("/applicationRoute/send", applicationFormRoutes)

module.exports = router;