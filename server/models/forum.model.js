import mongoose from "mongoose";

const forumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Título del foro
    description: { type: String, required:true }, // Descripción del foro
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Referencia a los posts
      },
    ], // Lista de IDs de posts
  },
  { timestamps: true }
);

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;