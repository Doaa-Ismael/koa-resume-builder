const mongoose = require("mongoose");

const { Schema } = mongoose;

const datedSectionSchema = new Schema({
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  organization: String,
});

const resumeSchema = new Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  basicInfo: {
    email: String,
    name: String,
    headline: String,
    location: String,
    phone: String,
  },
  positions: [datedSectionSchema],
  degrees: [datedSectionSchema],
  customSections: [{ label: String, description: String }],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
