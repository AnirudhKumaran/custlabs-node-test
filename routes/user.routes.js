import userController from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router()

router.get("/", userController.getAllAccounts);
router.post('/create',userController.createNewUser)
router.delete("/delete",userController.removeAccount)
router.post("/update",userController.editAccount)
router.get("/:emailId",userController.getAccount)

module.exports = router