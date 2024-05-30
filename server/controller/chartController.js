const db = require('../db')


class ChartController{
    async getChart(req,res) {
        try{
            const charts = await db.query("SELECT * FROM current_year")

            res.json(charts.rows)
        }catch(e){
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new ChartController()