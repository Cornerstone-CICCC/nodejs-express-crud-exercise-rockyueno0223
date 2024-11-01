import express, { NextFunction, Request, Response } from 'express';
import productRouter from './routes/product.route';

// Set up
const app = express();

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url === "/secure-page") { // Block access to secure url
    res.status(403).send("You are not allowed to visit...")
  }
  console.log(`Request made to ${req.url} at ${new Date()}`);
  next(); // Proceed to next middleware or route handler
})
app.use(express.json()) // Allow incoming json data

// Routes
app.use('/api/products', productRouter);

// Start server
app.listen(3500, () => {
  console.log('Server is running on port 3500...');
});
