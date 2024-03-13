const db = require('../db')
const bcrypt = require('bcryptjs');
const generateToken = require('../jwtGenerator');



class LoginController{

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Перевірка користувача в таблиці "workers"
            let queryResult = await db.query("SELECT * FROM workers WHERE email = $1", [email]);
            let user = queryResult.rows[0];
    
            // Якщо користувач не знайдений в таблиці "workers", перевіряємо таблицю "admins"
            if (!user) {
                queryResult = await db.query("SELECT * FROM admins WHERE email = $1", [email]);
                user = queryResult.rows[0];
            }
    
            // Якщо користувач не знайдений в обох таблицях, виводимо помилку
            if (!user) {
                return res.status(400).send('Email or password is wrong');
            }
    
            // Перевірка пароля
            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) {
                return res.status(400).send('Invalid password');
            }
    
            // Генерація токена доступу
            const token = generateToken(user);
    
            res.status(200).json({ token });
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    }

}


module.exports = new LoginController()