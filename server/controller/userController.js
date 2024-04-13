const db = require('../db')
const file = require("../fileService")


class trucksController{
    async create(req, res) {
        try {
            const { brand, model, license, status, isfavorite, fuel_type,adminId } = req.body;
    
            const isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;
    
            let picture;
    
            if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
            }
    
            const defaultStatus = status || "Доступний";

            
    
            const newTruck = await db.query(
                "INSERT INTO trucks (brand, model, license, status, isfavorite, picture, fuel_type, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                [brand, model, license, defaultStatus, isFavoriteDefault, picture, fuel_type, adminId]
            );
    
            res.json(newTruck.rows);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getTruckById(req, res) {
        const { id } = req.params;
      
        try {
          const truck = await db.query("SELECT * FROM trucks WHERE id = $1", [id]);
      
          if (truck.rows.length === 0) {
            return res.status(404).json({ error: "Truck not found" });
          }
      
          res.json(truck.rows[0]);
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

    async getTrucks(req, res){
        const { id } = req.params;
        try{
            const truck = await db.query("SELECT * FROM trucks WHERE admin_id = $1", [id])
            res.json(truck.rows);
        }catch(e){
            res.status(500).json({ error: "Internal Server Error" });

        }
    }
    

      async getTruck(req, res) {
        const { id } = req.params;
        const { page = 1, limit = 8 } = req.query; // Зчитування параметрів сторінки та ліміту
    
        try {
            const offset = (page - 1) * limit; // Вирахування зміщення для запиту
            const truck = await db.query("SELECT * FROM trucks WHERE admin_id = $1 ORDER BY id LIMIT $2 OFFSET $3", [id, limit, offset]); // Змінений SQL-запит з використанням LIMIT та OFFSET
    
            if (truck.rows.length === 0) {
                return res.status(404).json({ error: "Truck not found" });
            }
    
            const totalCount = await db.query("SELECT COUNT(*) FROM trucks WHERE admin_id = $1", [id]); // Запит для підрахунку загальної кількості записів
            const totalPages = Math.ceil(totalCount.rows[0].count / limit); // Обчислення загальної кількості сторінок
    
    
            res.json({
                data: truck.rows,
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount.rows[0].count,
                totalPages: totalPages,
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    async upTruk(req, res) {
        try {
            const { id, brand, model, license, status, isfavorite,fuel_type } = req.body;
            const isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

    
            let picture;
    
            if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
            }
    
            const truckup = await db.query(
                'UPDATE trucks SET brand = $1, model = $2, license = $3, status = $4, isfavorite = $5, picture = COALESCE($6, picture), fuel_type = $7 WHERE id = $8 RETURNING *',
                [brand, model, license, status, isFavoriteDefault, picture, fuel_type, id]
            );
            res.json(truckup.rows);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async upTrukFav(req, res) {
        try {
            const {isfavorite, id} = req.body;  
            const truckup = await db.query(
                'UPDATE trucks SET isfavorite = $1 WHERE id = $2 RETURNING *',
                [isfavorite, id]
            );
            res.json(truckup.rows);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    async deleteTruck(req, res){
        try{
            const {id} = req.params;
            // Спочатку видаляємо всі записи в таблиці "units", які мають зовнішній ключ, що посилається на вантажівку
            await db.query("DELETE FROM units WHERE truck_id = $1", [id]);
            
            // Потім можна видалити саму вантажівку
            const delete_truck_query = await db.query("DELETE FROM trucks WHERE id = $1 RETURNING *", [id]);
            const deletedTruck = delete_truck_query.rows[0];
            res.json(deletedTruck);
        } catch(e){
            res.status(500).json(e);
        }
    }

    async getFavTruck(req,res){
        try{
            const {id} = req.params
            const trucks = await db.query("SELECT * FROM trucks WHERE admin_id = $1 AND isfavorite = true", [id])
            res.json(trucks.rows)

        }catch{
            res.status(500).json(e);

        }
    }
}

module.exports = new trucksController()