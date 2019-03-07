const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
if (process.env.NODE_ENV !== 'production') require('../../secrets')

router.post('/image', async (req, res, next) => {
  try {
    if (process.env.GOOGLE_VISION_API_KEY) {
      const api_key = process.env.GOOGLE_VISION_API_KEY
      const newReq = {
        requests: [
          {
            image: {
              content: req.body.image
            },
            features: [
              {
                type: 'TEXT_DETECTION'
              }
            ]
          }
        ]
      }
      const text = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${api_key}`,
        newReq
      )
      // if(text.data.responses[0].fullTextAnnotation){
      //     console.log('vision text', text.data.responses[0].fullTextAnnotation.text)
      // }
      res.send(text.data)
    } else {
      res.status(500).send('Sorry, no api key')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
