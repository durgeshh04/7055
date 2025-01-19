## Project-5

This is a full-stack application built for a hackathon.

### Backend Installation

1. Clone the repository

git clone https://github.com/durgeshh04/7055.git
cd server

2. Install dependencies

npm install

3. Start the server

npm start

The server will start running on `http://localhost:3000`

### Frontend Installation

1. Navigate to frontend directory

cd client

2. Install dependencies

npm install

3. Start the development server

npm start

The frontend will start running on `http://localhost:5173`

### API Endpoints

#### Get All Dishes

- **Method:** GET
- **Endpoint:** `/api/dishes`
- **Description:** Retrieves all dishes from the database
- **Response:** Array of dish objects

#### Add New Dish

- **Method:** POST
- **Endpoint:** `/api/dishes`
- **Description:** Creates a new dish entry
- **Request Body:**

{
"name": "Dish Name",
"price": 299,
"description": "Dish description",
"image": "image-url",
"category": "category-name"
}

#### Update Dish

- **Method:** PUT
- **Endpoint:** `/api/dishes/:id`
- **Description:** Updates an existing dish by ID
- **Request Body:** Same as POST request

#### Delete Dish

- **Method:** DELETE
- **Endpoint:** `/api/dishes/:id`
- **Description:** Removes a dish from the database by ID

### Environment Variables

Create a `.env` file in the root directory with the following variables:

PORT=3000
MONGODB_URI=your_mongodb_connection_string

### Tech Stack

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Frontend:
- React.js
- Axios
- React Router

### Project Structure

project/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── dish.model.js
│   ├── routes/
│   │   └── dish.routes.js
│   ├── controllers/
│   │   └── dish.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── .env
│   ├── package.json
│   └── server.js
