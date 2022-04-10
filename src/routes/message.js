import { Router } from 'express';
const MessageController = require("../controllers/MessageController.js");

const router = Router();


router.get('/', MessageController.messageList);
router.get('/:messageId', MessageController.messageDetail);
router.post('/', MessageController.messageStore);
router.post('/update', MessageController.messageUpdate);
router.delete('/:messageId', MessageController.messageDelete);

export default router;
