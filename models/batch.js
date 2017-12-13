const mongoose = require('../config/database')
const { Schema } = mongoose

const batchSchema = new Schema({
  batchNumber: { type: Number, required: true },
  startedAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('batches', batchSchema)
