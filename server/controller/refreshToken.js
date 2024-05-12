const jwt = require('jsonwebtoken');
const generateToken = require('../jwtGenerator');



class refreshToken {
    async refresh(req, res) {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        jwt.verify(token, "rweqtwqfdsagqrwgfsre87423huiu2u243h932y4b38g28b", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            console.log(decoded);

            const id = decoded.id;
            const worker_id = decoded.worker_id;
            
            const newToken = generateToken({
                ...decoded,
                id: id,
                worker_id: worker_id
            });

            // Отправка нового токена в ответе
            res.status(200).json({ token: newToken });
        });
    }
}

module.exports = new refreshToken();