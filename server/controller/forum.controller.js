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
    const forums = await Forum.find({ isActive: true }).populate("posts", "_id title content image authors ");
    if (!forums) return res.status(404).json({ message: 'No Forums Were Found!' });

    res.status(200).json(forums);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

const getForumById = async (req, res) => {
  // check to see if ID is a matching with a matching object(has to be 24  hexadecimal  alphanumeric characters)
  if (!req.params.forumId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  }
  try {
    const forum = await Forum.find({ _id: req.params.forumId, isActive: true }).populate("posts", "_id title content image authors ");
    if (!forum) return res.status(404).json({ message: 'No Forum Was Found!' });

    res.status(200).json(forum);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

const updateForumById = async (req, res) => {

  // check to see if ID is a matching with a matching object(has to be 24  hexadecimal  alphanumeric characters)
  if (!req.params.forumId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  }
  try {
    const forum = await Forum.findByIdAndUpdate(req.params.forumId, req.body, { new: true }).populate("posts", "_id title content image authors ");

    if (!forum) return res.status(404).json({ message: 'No Forum Was Found!' });

    res.status(200).json(forum);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

const deleteForumById = async (req, res) => {
  // check to see if ID is a matching with a matching object(has to be 24  hexadecimal  alphanumeric characters)
  if (!req.params.forumId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid post ID' })
  }
  try {
    const forum = await Forum.findByIdAndUpdate(req.params.forumId, { isActive: false }, { new: false });

    if (!forum) return res.status(404).json({ message: 'No Forum Was Found!' });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export { createForum, getAllForums, getForumById, updateForumById, deleteForumById }