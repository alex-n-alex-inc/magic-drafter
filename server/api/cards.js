const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/search/:cardName', async (req, res, next) => {
  try {
    const name = req.params.cardName
    const card = await axios.get(
      `https://api.scryfall.com/cards/named?fuzzy=${name}`
    )
    // console.log(card.data)
    res.json(card.data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
