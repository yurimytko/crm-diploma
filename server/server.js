const express = require('express');
const router = require('./router/userRouter');
const workerRouter = require('./router/workersRouter')
const unitRouter = require('./router/unitRouter')
const loginRouter = require('./router/loginRouter')
const adminRouter = require('./router/adminRout')
const refRouter = require('./router/refreshRouter')
const fileUpload = require('express-fileupload');
const cors = require('cors');


const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use('/api/truck', router);
app.use('/api/worker', workerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/ref', refRouter)

app.use('/api/unit', unitRouter);
app.use('/api/auth', loginRouter);




app.listen(PORT, () => console.log('listening on port ' + PORT));
