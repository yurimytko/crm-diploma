
const jwt = require('jsonwebtoken');



const generateToken = (user) => {
    const expiresIn = 30;

    let payload = {
        id: user.id,
        admin_id: user.admin_id !== undefined ? user.admin_id : user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        picture: user.picture
    };

    return jwt.sign(payload, 
        "rweqtwqfdsagqrwgfsre87423huiu2u243h932y4b38g28b",
        { expiresIn });
};
module.exports = generateToken;