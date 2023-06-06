import express from 'express'
import usersService from './users.controller'

const router = express.Router()

router.post('/create-user', usersService.createUser)

export default router
