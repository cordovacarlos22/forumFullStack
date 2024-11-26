import mongoose from "mongoose";

const forumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // Título del foro
    description: { type: String, required: true }, // Descripción del foro
    category: { type: String, required: true },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Referencia a los posts
      },
    ], // Lista de IDs de posts
    isActive: { type: Boolean, default: true }, // Indica si el foro está activo o no
  },
  { timestamps: true }
);

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;