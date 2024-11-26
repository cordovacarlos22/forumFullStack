import Forum from '../models/forum.model.js'


const createForum = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Process failed: Missing required data (title, description or category)' });
  }

  try {
    const forum = await Forum.create(req.body);
    res.status(201).json(forum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

const getAllForums = async (req, res) => {
  try {

  } catch (error) {

  }
};

const getForumById = async (req, res) => {
  try {

  } catch (error) {

  }
};

const updateForumById = async (req, res) => {
  try {

  } catch (error) {

  }
};

const deleteForumById = async (req, res) => {
  try {

  } catch (error) {

  }
};

export { createForum, getAllForums, getForumById, updateForumById, deleteForumById }