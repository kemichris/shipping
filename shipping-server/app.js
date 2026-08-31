import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import errorHandler from './middlewares/errorHandler'
import notFound from './middlewares/notFound'

const app = express()

app.use(helmet())
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bank API is running'
    });
});


app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bank API is running"
    });
});



app.use('/api', routes);

app.use(notFound);

app.use(errorHandler);

export default app;