import express from 'express'
import { newContact, getAllContact, getContactById, updatedContactById, deleteContactById, getContactByUserId} from '../controllers/contact.js'
import { isAuthenticated } from '../Middleware/Auth.js';


const router = express.Router()

// @Contact API
// api desc:- create new contact
// api-endpoint:- /api/contact/new
router.post('/new', isAuthenticated,newContact);

// @Contact API
// api desc:- get all contact
// api-endpoint:- /api/contact/
router.get('/', getAllContact);

// @Contact API
// api desc:- get contact By ID
// api-endpoint:- /api/contact/:id
router.get('/:id', getContactById);

// @Contact API
// api desc:- update contact By ID
// api-endpoint:- /api/contact/update/:id
router.put('/update/:id', isAuthenticated,updatedContactById);

// @Contact API
// api desc:- delete contact By ID
// api-endpoint:- /api/contact/delete/:id
router.delete('/delete/:id', isAuthenticated,deleteContactById);

router.get('/user/:id', getContactByUserId);

export default router

