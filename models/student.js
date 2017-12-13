const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  batchId: { type: Schema.Types.ObjectId, ref: 'batches' },
})

module.exports = mongoose.model('students', studentSchema)
