import dbConnect from '../../utils/dbConnect';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    console.log('Attempting to connect to the database...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    const startTime = Date.now();
    await dbConnect();
    const connectionTime = Date.now() - startTime;
    
    console.log(`Successfully connected to the database in ${connectionTime}ms`);
    
    const dbStatus = mongoose.connection.readyState;
    const dbStatusString = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbStatus];
    
    res.status(200).json({ 
      status: 'Connected to database',
      connectionTime: `${connectionTime}ms`,
      databaseStatus: dbStatusString
    });
  } catch (error) {
    console.error('Error in db-status handler:', error);
    res.status(500).json({ 
      status: 'Failed to connect to database',
      error: error.message,
      stack: error.stack,
      mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    });
  }
}