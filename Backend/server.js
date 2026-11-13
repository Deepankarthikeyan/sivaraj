import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// 1. Clean import using modern mssql global connection mapping
import { sql } from './db.js'; 
import websiteRoutes from './WebsiteAPI/websiteRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 46641;

// Global Middleware
app.use(cors()); // Allows your Vue.js frontend to talk to this backend
app.use(express.json()); // Allows Express to read incoming JSON data maps
app.use('/api/website', websiteRoutes);

// 2. Sample API Route (Fetching data safely using the active connection)
app.get('/api/website/page-images/welcome-way/fabric-rolls', async (req, res) => {
    try {
        // Modern mssql automatically handles the global pool once connected in db.js
        const result = await sql.query`SELECT id, name, email FROM Users`;
        
        // Send data back to your Vue.js application
        res.status(200).json(result.recordset); 
    } catch (err) {
        console.error('SQL Error: ', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Fallback Route for non-existent endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
