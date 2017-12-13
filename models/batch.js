const mongoose = require('../config/database')
const { Schema } = mongoose

const batchSchema = new Schema({
  batchNumber: { type: Number, required: true },
  studentsCount: { type: Number, required: true },
  photo: { type: String, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  startedAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('batches', batchSchema)
