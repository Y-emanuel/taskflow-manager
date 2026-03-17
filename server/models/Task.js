import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Por favor agregá un texto'],
      trim: true,
      maxlength: [200, 'El texto no puede tener más de 200 caracteres'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Task', taskSchema);