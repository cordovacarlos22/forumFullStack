const isTheSameUser = (req, res, next) => {
    if (req.userId !== req.params.userId &&  req.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

export { isTheSameUser };