const db = require('../db')



class transferController{
    async create(req, res) {
        try {
            const { truck_id, worker_id, admin_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time, income, costs } = req.body;
    
            const transfer = await db.query("INSERT INTO transfers (truck_id, worker_id, admin_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time, income, costs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
                [truck_id, worker_id, admin_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time, income, costs]);
    
            res.json(transfer.rows);
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }

    async getAllTransfers(req, res) {
        try {
            const { id } = req.params;
            const transfers = await db.query(
                "SELECT transfers.*, workers.id AS worker_id, workers.name AS worker_name,workers.surname AS worker_surname,workers.phone AS worker_phone, workers.picture AS worker_picture, trucks.id AS truck_id,trucks.brand AS truck_brand, trucks.model AS truck_model, trucks.license AS truck_license FROM transfers JOIN workers ON transfers.worker_id = workers.id JOIN trucks ON transfers.truck_id = trucks.id WHERE transfers.admin_id = $1",
                [id]
            );
    
            const formattedTransfers = transfers.rows.map(transfer => {
                const { worker_id, worker_name, worker_surname,worker_phone, worker_picture,truck_id, truck_brand, truck_model, truck_license, ...rest } = transfer;
                return {
                    ...rest,
                    driver: {
                        id: worker_id,
                        name: worker_name,
                        surname: worker_surname,
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

    async deleteTransfer(req, res) {
        try {
            const { id } = req.params;
    
            const truckIdQuery = await db.query("SELECT truck_id FROM transfers WHERE id = $1", [id]);
            const truckId = truckIdQuery.rows[0].truck_id;
    
            const updateStatusQuery = "UPDATE trucks SET status = 'Доступний' WHERE id = $1";
            await db.query(updateStatusQuery, [truckId]);
    
            const incomeResult = await db.query("SELECT income FROM transfers WHERE id = $1", [id]);
            const income = incomeResult.rows[0].income;
    
            const costsResult = await db.query("SELECT costs FROM transfers WHERE id = $1", [id]);
            const costs = costsResult.rows[0].costs;
    
            const data = income - costs;
    
            // Отримання поточної дати
            const currentDate = new Date().toISOString().split('T')[0];
    
            // Перевірка, чи є сьогоднішня дата в таблиці current_year
            const tableData = await db.query("SELECT * FROM current_year WHERE date = $1", [currentDate]);
    
            if (tableData.rows.length > 0) {
                // Якщо сьогоднішня дата вже існує в таблиці, оновити рядок з цією датою
                const existingIncome = tableData.rows[0].income;
                const updatedIncome = existingIncome + data;
                const updatedRow = await db.query("UPDATE current_year SET income = $1 WHERE date = $2 RETURNING *", [updatedIncome, currentDate]);
                // Отримати оновлені дані, якщо потрібно
                const updatedData = updatedRow.rows[0];
                // Опрацьовувати отримані дані
                // наприклад, повідомлення про успішне оновлення
                console.log('Рядок оновлено:', updatedData);
            } else {
                // Якщо сьогоднішня дата відсутня в таблиці, вставити новий рядок з сьогоднішньою датою та значенням доходу
                const formattedDate = currentDate;
                const incomer = await db.query("INSERT INTO current_year(date, income) VALUES($1, $2) RETURNING *", [formattedDate, data]);
                // Отримати дані про новий рядок, якщо потрібно
                const insertedData = incomer.rows[0];
                // Опрацьовувати отримані дані
                // наприклад, повідомлення про успішне вставлення нового рядка
                console.log('Новий рядок вставлено:', insertedData);
            }
    
            // Видалення запису про перенесення після обробки даних
            const deletedTransfer = await db.query("DELETE FROM transfers WHERE id = $1", [id]);
    
            res.json({ message: "Успішно видалено перенесення" });
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
}


module.exports = new transferController()