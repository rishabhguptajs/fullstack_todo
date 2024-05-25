import express, { json } from 'express'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes.js'

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));
app.use(json())

app.use('/api', taskRoutes);

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})