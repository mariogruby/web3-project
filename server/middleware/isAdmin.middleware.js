
const isAdmin = (req, res, next) => {
    if(req.payload){
        if(req.payload.userRole === 1) {
            next()
        } else {
            res.status(403).json({ message: "Permission denied. User is not an admin." });
        }
    } else  {
        res.status(401).json({ message: "Unauthorized. Please log in." });
    }
};

module.exports = { isAdmin } 