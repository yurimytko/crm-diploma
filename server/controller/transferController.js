const db = require('../db')



class transferController{
    async create(req,res){
        try{
            const {truck_id, worker_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time} = req.body


            const transfer = await db.query("INSERT INTO transfers (truck_id, worker_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)  RETURNING *",
            [truck_id, worker_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time  ])

            res.json(transfer)
        }catch(e){
            console.error(e);
            res.status(500).json(e);
        }
    }
}


module.exports = new transferController()