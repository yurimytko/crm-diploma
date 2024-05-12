const db = require('../db')
const file = require('../fileService')
const bcrypt = require('bcrypt');
const sendEmail = require('../midleware/sendMail')

const passGenerator = require("../midleware/generatePass")


class workersController{
    async create(req, res) {
        try {
            const { name, surname, phone, email, role, status, isfavorite, adminId} = req.body;
            const isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;
            let picture;
    
            if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
            }
    
            const defaultStatus = status || "Працює";
    
            const existingEmail = await db.query("SELECT * FROM workers WHERE email = $1", [email]);
            if (existingEmail.rows.length > 0) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
    
            const existingPhone = await db.query("SELECT * FROM workers WHERE phone = $1", [phone]);
            if (existingPhone.rows.length > 0) {
                return res.status(400).json({ message: 'Phone number is already registered' });
            }
            
            const password = passGenerator(8)
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newWorker = await db.query(
                "INSERT INTO workers (name, surname, phone, email, role, status, picture, isfavorite, password, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
                [name, surname, phone, email, role, defaultStatus, picture, isFavoriteDefault, hashedPassword, adminId]
            );


            const emailSubject = 'Реєстрація  завершена';
            const emailText = `Дякуємо за реєстрацію ${name} ${surname}! Ваш пароль: ${password}`;
            await sendEmail(email, emailSubject, emailText);
    
            res.json(newWorker.rows);
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
    async getWorker(req, res) {
        const { id } = req.params;
    
        try {
            const workers = await db.query("SELECT * FROM workers WHERE admin_id = $1", [id]);
    
            if (workers.rows.length === 0) {
                return res.status(404).json({ error: "Worker not found" });
            }
    
            res.json(workers.rows);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async getWorkerById(req, res) {
        const { id } = req.params;
      
        try {
          const worker = await db.query("SELECT * FROM workers WHERE id = $1", [id]);
      
          if (worker.rows.length === 0) {
            return res.status(404).json({ error: "Worker not found" });
          }
      
          res.json(worker.rows[0]);
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
      async deleteWorker(req, res){
        try {
            const id = req.params.id;
            await db.query("DELETE FROM units WHERE worker_id = $1", [id]);

            const delete_worker_query = await db.query("DELETE FROM workers WHERE id = $1 RETURNING *", [id]);
            const deletedWorker = delete_worker_query.rows[0];
            res.json(deletedWorker);
        } catch(e){
            res.status(500).json(e);
        }
    }
    async upWorker(req, res) {
        try {
            const { id, name,surname,phone,email,role,status,isfavorite } = req.body;
            const isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

    
            let picture;
    
            if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
            }
    
            const workerup = await db.query(
                'UPDATE workers SET name = $1, surname = $2, phone = $3, email = $4, role = $5, status = $6, picture = COALESCE($7, picture), isfavorite = $8 WHERE id = $9 RETURNING *',
                [name, surname, phone, email,role ,status, picture, isFavoriteDefault, id]
            );
            res.json(workerup.rows);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async upFavorite(req,res){
        try{
            const {id, isfavorite} = req.body
            const favUpdate = await db.query(
                'UPDATE workers SET isfavorite = $1 WHERE id = $2 RETURNING *',
                [isfavorite, id]
            )
            res.json(favUpdate.rows)

        }catch(e){
            res.status(500).json(e);

        }
    }

    async getFavWorkers(req,res){
        try{
            const{id} = req.params
            const workers = await db.query("SELECT * FROM workers WHERE admin_id = $1 AND isfavorite = true", [id])
            res.json(workers.rows)
        }catch(e){
            res.status(500).json(e)
        }
    }

}


module.exports = new workersController()