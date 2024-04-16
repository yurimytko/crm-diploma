const db = require('../db')



class transferController{
    async create(req,res){
        try{
            const {truck_id, worker_id, admin_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time} = req.body


            const transfer = await db.query("INSERT INTO transfers (truck_id, worker_id, admin_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)  RETURNING *",
            [truck_id, worker_id, admin_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time  ])

            res.json(transfer.rows)
        }catch(e){
            console.error(e);
            res.status(500).json(e);
        }
    }

    async getAllTransfers(req, res) {
        try {
            const { id } = req.params;
            const transfers = await db.query(
                "SELECT transfers.*, workers.id AS worker_id, workers.name AS worker_name, workers.phone AS worker_phone, workers.picture AS worker_picture, trucks.id AS truck_id,trucks.brand AS truck_brand, trucks.model AS truck_model, trucks.license AS truck_license FROM transfers JOIN workers ON transfers.worker_id = workers.id JOIN trucks ON transfers.truck_id = trucks.id WHERE transfers.admin_id = $1",
                [id]
            );
    
            const formattedTransfers = transfers.rows.map(transfer => {
                const { worker_id, worker_name, worker_phone, worker_picture,truck_id, truck_brand, truck_model, truck_license, ...rest } = transfer;
                return {
                    ...rest,
                    driver: {
                        id: worker_id,
                        name: worker_name,
                        phone: worker_phone,
                        picture: worker_picture
                    },
                    truck: {
                        id: truck_id,
                        brand: truck_brand,
                        model: truck_model,
                        license: truck_license
                    }
                };
            });

            const updateStatusQuery = "UPDATE trucks SET status = 'В рейсі' WHERE id IN (SELECT truck_id FROM transfers WHERE admin_id = $1)";
            await db.query(updateStatusQuery, [id]);
    
            res.json(formattedTransfers);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
}


module.exports = new transferController()