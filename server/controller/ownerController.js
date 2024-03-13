const db = require('../db')
const file = require('../fileService')
const bcrypt = require('bcrypt');
const sendEmail = require('../midleware/sendMail')


class OwnerController {
    async create(req, res) {
        try {
            const { name, surname, phone, email, role, status, isfavorite, password } = req.body;
            const isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;
            let picture;
    
            if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
            }
    
            const defaultStatus = status || "Працює";
            const defaultRole = role || "Власник"; // Додано умову для встановлення ролі за замовчуванням
    
            // Check if the email already exists in the database
            const existingEmail = await db.query("SELECT * FROM admins WHERE email = $1", [email]);
            if (existingEmail.rows.length > 0) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
    
            // Check if the phone number already exists in the database
            const existingPhone = await db.query("SELECT * FROM admins WHERE phone = $1", [phone]);
            if (existingPhone.rows.length > 0) {
                return res.status(400).json({ message: 'Phone number is already registered' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newAdmin = await db.query(
                "INSERT INTO admins (name, surname, phone, email, role, status, picture, isfavorite, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
                [name, surname, phone, email, defaultRole, defaultStatus, picture, isFavoriteDefault, hashedPassword] // Використано defaultRole
            );
    
            const emailSubject = 'Регистрация завершена';
            const emailText = `Спасибо за регистрацию ${name} ${surname}! Ваш пароль: ${password}`;
            await sendEmail(email, emailSubject, emailText);
    
            res.json(newAdmin.rows);
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
    async getAdmin(req, res){
        try{
            const worker = await db.query("SELECT * FROM admins")
            res.json(worker.rows)
        }catch(e){
            res.status(500).json(e)
        }
    }
}


module.exports = new OwnerController()