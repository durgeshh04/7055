## Restaurant Server API

This is the backend server for a hackathon.

### Installation

1. Clone the repository

git clone https://github.com/durgeshh04/7055.git
cd server

2. Install dependencies

npm install

3. Start the server

npm start

The server will start running on `http://localhost:3000`

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

- Node.js
- Express.js
- MongoDB
- Mongoose

### Project Structure

server/
├── config/
│ └── db.js
├── models/
│ └── dish.model.js
├── routes/
│ └── dish.routes.js
├── controllers/
│ └── dish.controller.js
├── middleware/
│ └── auth.middleware.js
├── .env
├── package.json
└── server.js
