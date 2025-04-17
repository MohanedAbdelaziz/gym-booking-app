# Gym Booking App

A simple gym booking system built with the MERN Stack (MongoDB, Express, React, Node.js).  
This project currently supports user authentication and a basic dashboard.

---

## **Current Features**

- User Registration (Sign Up)
- User Login
- Token stored in `localStorage`
- Display user info on Dashboard

---

## **Tech Stack**

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **HTTP:** REST APIs using `fetch`

---

## **Running the Project Locally**

### 1. Clone the repository
```bash
git clone https://github.com/MohanedAbdelaziz/gym-booking-app.git
```
### 2. Run the Backend
```bash
cd backend
npm install
npm run dev
```


### 1. Run the Frontend
```bash
cd frontend
npm install
npm start
```

### Make sure to create a .env file inside the backend folder with the following content:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## **Upcoming Features**

- Admin can create and manage slots
- Users can book available gym slots
- Admin dashboard for user and slot management
- Mobile responsive UI

