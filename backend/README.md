# Urban Bistro Restaurant - Backend API

This is the Node.js/Express backend for the Urban Bistro Restaurant web application. It provides REST API endpoints for managing menu items and processing customer orders using MongoDB for data persistence.

## Features

- **Menu Management**: CRUD operations for restaurant menu items
- **Order Processing**: Accept and store customer orders with real-time database updates
- **Data Persistence**: All data is stored in MongoDB with timestamps
- **CORS Support**: Fully configured for frontend integration
- **RESTful API**: Clean and intuitive endpoint design

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally on `localhost:27017` or provide connection URI)
- **npm** (comes with Node.js)

## Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**:
   - On Windows: Start MongoDB manually or use MongoDB Atlas cloud service
   - On Mac/Linux: `brew services start mongodb-community` or similar

## Configuration

The backend uses a `.env` file for configuration. Create or edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/restaurant_db
PORT=5000
NODE_ENV=development
```

### Environment Variables

- `MONGODB_URI`: MongoDB connection string (local or Atlas)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Node environment (development/production)

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Menu Items

#### Get All Menu Items
```
GET /api/menu
Response: Array of menu items sorted by category
```

#### Get Single Menu Item
```
GET /api/menu/:id
Response: Single menu item object
```

#### Create Menu Item
```
POST /api/menu
Body: {
  "name": "Dish Name",
  "price": 12.99,
  "category": "Starters|Mains|Desserts",
  "image": "image_url",
  "desc": "Description"
}
Response: Created menu item with _id
```

#### Update Menu Item
```
PATCH /api/menu/:id
Body: Partial menu item object (any fields to update)
Response: Updated menu item
```

#### Delete Menu Item
```
DELETE /api/menu/:id
Response: Success message
```

### Orders

#### Get All Orders
```
GET /api/orders
Response: Array of all orders (newest first)
```

#### Get Single Order
```
GET /api/orders/:id
Response: Single order object
```

#### Create Order
```
POST /api/orders
Body: {
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "555-1234",
  "items": [
    {
      "id": "menu_item_id",
      "name": "Item Name",
      "price": 9.99,
      "qty": 2
    }
  ],
  "total": "19.98",
  "notes": "No onions"
}
Response: Created order with _id and timestamps
```

#### Update Order Status
```
PATCH /api/orders/:id
Body: {
  "status": "pending|confirmed|preparing|ready|delivered",
  "notes": "Updated notes"
}
Response: Updated order
```

#### Delete Order
```
DELETE /api/orders/:id
Response: Success message
```

## Database Schema

### MenuItem
```javascript
{
  _id: ObjectId,
  name: String (required),
  price: Number (required),
  category: String (required) - enum: ['Starters', 'Mains', 'Desserts'],
  image: String (required),
  desc: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String (required),
  items: [
    {
      id: ObjectId,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number (required),
  status: String - enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Initial Data

The server automatically seeds the database with default menu items on first run if the database is empty. This includes all 6 restaurant dishes.

## Health Check

```
GET /api/health
Response: {
  "status": "Server is running",
  "timestamp": "2025-05-17T..."
}
```

## CORS Configuration

The API is configured to accept requests from any origin. Modify the CORS configuration in `server.js` if you need to restrict access:

```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Specify frontend URL
  credentials: true
}))
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a message field:
```json
{
  "message": "Error description"
}
```

## Development Tips

- Use MongoDB Compass to visually inspect your database
- Use Postman or Insomnia to test API endpoints
- Check the browser console and server logs for debugging
- Ensure the frontend API URL matches your backend port

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the MONGODB_URI in `.env`
- Try connecting directly: `mongo mongodb://localhost:27017/restaurant_db`

### Port Already in Use
- Change the PORT in `.env` to an available port
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### CORS Errors
- Ensure the frontend URL is allowed in CORS configuration
- Check that both frontend and backend are running

## Frontend Integration

The React frontend expects the API to be running at `http://localhost:5000/api`. Update the API URL in the frontend if your backend runs on a different port.
