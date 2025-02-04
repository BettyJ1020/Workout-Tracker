# **🏋️ Workout Tracker**

This is a full-stack web application for managing **Workout Routines**, allowing users to track progress and store data persistently with a React frontend and a FastAPI backend.

## **🚀 Features**
- **User Authentication:** Login system to identify users.
- **Workout Routine Management:** Add, edit, delete, and mark workout tasks as completed.
- **Part-based Categorization:** Workouts are grouped by body parts.
- **User-specific Data:** Each user’s data is stored separately in the backend.
- **Real-time Updates:** Automatic UI updates after any modification.
- **Database Support:** Uses SQLite with SQLAlchemy ORM.

---

## **📌 Tech Stack**
### **Frontend**
- **Framework:** React, React Router
- **State Management:** useState, useEffect
- **Storage:** LocalStorage for user session
- **Styling:** CSS modules

### **Backend**
- **Framework:** FastAPI
- **Database:** SQLite with SQLAlchemy ORM
- **Authentication:** bcrypt (for password hashing)
- **Middleware:** CORS (for frontend-backend communication)

---

## **📥 Installation**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/BettyJ1020/Workout-Tracker.git
cd Workout-Tracker
```

---

### **2️⃣ Setup the Frontend**
```bash
cd frontend
npm install
npm run dev
```
By default, the frontend runs at **`http://localhost:5173/`**.

---

### **3️⃣ Setup the Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
By default, the backend runs at **`http://127.0.0.1:8000/`**.

---

## **📌 Project Structure**
```
Workout-Tracker/
├── backend/                # Backend (FastAPI)
│   ├── database.py         # Database models and initialization
│   ├── main.py             # FastAPI application entry point
│   ├── workout.db          # SQLite database file
│   ├── venv/               # Python virtual environment (ignored by .gitignore)
├── frontend/               # Frontend (React)
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   │   ├── CreateForm.jsx
│   │   │   ├── EditItem.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoWrapper.jsx
│   │   │   ├── LoginPage.jsx
│   │   ├── App.jsx         # Main application entry
│   │   ├── main.jsx        # React root component
│   ├── public/             # Static assets
│   ├── package.json        # Project dependencies
├── README.md               # Project documentation
```

---

## **🛠 API Endpoints**
### **User Authentication**
#### **Login/Register**
- **Endpoint:** `POST /api/login`
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```

---

### **Workout Routine Management**
#### **Get Todos**
- **Endpoint:** `GET /todos/?user_id={userId}`

#### **Add Todo**
- **Endpoint:** `POST /todos/`
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "part": "Glute1",
    "content": "Lunges",
    "isCompleted": false
  }
  ```

#### **Edit Todo**
- **Endpoint:** `PUT /todos/{id}`

#### **Delete Todo**
- **Endpoint:** `DELETE /todos/{id}`

#### **Toggle Todo Completion**
- **Endpoint:** `PATCH /todos/{id}/toggle`

---

## **🔑 Database Schema**
### **Users Table**
| Column   | Type   | Description             |
|----------|--------|-------------------------|
| `id`     | int    | Primary key             |
| `username` | str  | Unique user identifier  |
| `password` | str  | Hashed password        |

### **Todos Table**
| Column      | Type   | Description                        |
|------------|--------|------------------------------------|
| `id`       | int    | Primary key                        |
| `user_id`  | int    | Foreign key referencing `users.id` |
| `part`     | str    | Body part category (e.g., Chest)  |
| `content`  | str    | Workout description               |
| `isCompleted` | bool | Task completion status          |

---

## **📌 Deployment**
1. **Run Locally**
   - Frontend: `npm run dev` (http://localhost:5173/)
   - Backend: `uvicorn main:app --reload` (http://127.0.0.1:8000/)

2. **Deploy to Cloud**
   - Use AWS, GCP, or Heroku for deployment.
   - Update API URLs in the frontend accordingly.

---

## **✅ Next Steps**
- Implement **JWT Authentication** for secure sessions.
- Add unit tests for API endpoints.
- Enhance error handling and API validation.

---

## **📜 License**
This project is open-source and available under the [MIT License](LICENSE).

---

## **🚀 Contributing**
Feel free to **fork, modify, and submit pull requests**! 😊