const router = require('express').Router()
const { Batch } = require('../models')
const passport = require('../config/auth')

router.get('/batches', (req, res, next) => {
  Batch.find()
    // Newest batches first
    .sort({ startedAt: -1 })
    // Send the data in JSON format
    .then((batches) => res.json(batches))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .post('/batches', passport.authorize('jwt', { session: false }), (req, res, next) => {
    let newbatch = req.body
    newbatch.authorId = req.account._id

    Batch.create(newbatch)
      .then((batch) => res.json(batch))
      .catch((error) => next(error))
  })

module.exports = router
