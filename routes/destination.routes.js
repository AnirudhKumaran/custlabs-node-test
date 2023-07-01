import destinationController from '../controllers/destination.controller';
import * as express from 'express';
const router = express.Router()

router.get("/", destinationController.getAllDestinations);
router.post('/create',destinationController.createNewDestination)
router.delete("/delete",destinationController.deleteDestination)
router.post("/update",destinationController.updateDestination)
router.get("/:emailId",destinationController.getDestination)

module.exports = router