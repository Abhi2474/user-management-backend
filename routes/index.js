import express from 'express'
import UserControllers from '../controllers/index'

const router = express.Router()

router.get('/users', UserControllers.get_user)
router.post('/users', UserControllers.create_user)
router.put('/users/:id', UserControllers.update_user)
router.delete('/users/:id', UserControllers.delete_user)
router.get('/users/:id', UserControllers.single_user)


export default router