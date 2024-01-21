
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Project Model
const projectSchema = new Schema({
    arabic_name: {
      type: String,
      required: true
    },
    english_name: {
      type: String,
      required: true
    },
    arabic_description: {
      type: String,
      required: true
    },
    english_description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },

    // coverImage: {
    //   type: String
    // },
    // images: [{
    //   type: String
    // }],
    created_at: {
      type: Date,
      default: Date.now
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true
    }
  });
  
  const Project = mongoose.model('Project', projectSchema);
  
  module.exports = Project ;
  