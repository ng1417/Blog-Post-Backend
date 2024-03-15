const expess = require("express");
const router = expess.Router();

const {signupUser, loginUser} = require("../controllers/user");

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;