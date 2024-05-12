const db = require('../db')

class untitController{
    async createUnit(req, res) {
        try {
            const { truck_id, worker_id } = req.body;
    
            const existingTruckUnit = await db.query("SELECT * FROM units WHERE truck_id = $1", [truck_id]);
    
            if (existingTruckUnit.rows.length > 0) {
                return res.status(400).json({ error: "Вантажівка вже призначена іншому unit." });
            }
    
            const existingWorkerUnit = await db.query("SELECT * FROM units WHERE worker_id = $1", [worker_id]);
    
            if (existingWorkerUnit.rows.length > 0) {
                return res.status(400).json({ error: "Робітник вже призначений іншому unit." });
            }
    
            const newUnit = await db.query("INSERT INTO units (truck_id, worker_id) VALUES ($1, $2) RETURNING *", [truck_id, worker_id]);
    
            res.json(newUnit.rows);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getUnit(req, res) {
        try {
            const unit = await db.query(
                "SELECT units.id, trucks.id AS truck_id, trucks.brand AS truck_brand, trucks.model AS truck_model, trucks.license AS truck_license, workers.id AS worker_id, workers.name AS worker_name, workers.surname AS worker_surname, workers.phone AS worker_phone FROM units JOIN trucks ON units.truck_id = trucks.id JOIN workers ON units.worker_id = workers.id"
            );
    
            const formattedResponse = unit.rows.map(row => ({
                id: row.id,
                truck: {
                    id: row.truck_id,
                    brand: row.truck_brand,
                    model: row.truck_model,
                    license: row.truck_license
                },
                worker: {
                    id: row.worker_id,
                    name: row.worker_name,
                    surname: row.worker_surname,
                    phone: row.worker_phone
                }
            }));
    
            res.json(formattedResponse);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new untitController()