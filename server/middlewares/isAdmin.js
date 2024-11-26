const isAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}

export { isAdmin }
