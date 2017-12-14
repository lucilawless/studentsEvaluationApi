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
  //.post('/batches', passport.authorize('jwt', { session: false }), (req, res, next) => {
  .post('/batches', (req, res, next) => {
    let newBatch = req.body
    // newBatch.authorId = req.account._id

    Batch.create(newBatch)
      .then((batch) => res.json(batch))
      .catch((error) => next(error))
  })
  .put('/batches/:id', (req, res, next) => {
    const id = req.params.id
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }

        const newData = req.body

        recipe.update(newData)
          .then((updatedRecipe) => {
            res.json(updatedRecipe)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })

module.exports = router
