import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  hobbies: { type: String, required: true }
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);