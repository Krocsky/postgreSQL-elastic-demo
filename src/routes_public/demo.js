import express from 'express'

const router = express.Router()

router.get('/welcome', async function (_, { succ }, ) {
  succ('welcome')
})

export default router
