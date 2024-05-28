const jwt = require('jsonwebtoken');




const  verifyToken = (req, res, next) => {


    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send('Access Denied');
        const verified = jwt.verify(token, "rweqtwqfdsagqrwgfsre87423huiu2u243h932y4b38g28b");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;