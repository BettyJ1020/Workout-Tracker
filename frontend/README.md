# **Workout Tracker Frontend (React)**
This is the **frontend** for the **Workout Tracker**, a web application that allows users to **manage their workout routines**, track progress, and store their data persistently in the backend.

## **🚀 Features**
- **User Authentication:** Login system to identify users.
- **Workout Routine Management:** Add, edit, and delete workout tasks.
- **Part-based Categorization:** Workouts are grouped by body parts.
- **User-specific Data:** Each user’s data is stored separately in the backend.
- **Real-time Updates:** Automatic UI updates after any modification.

---

## **📌 Tech Stack**
- **Frontend:** React, React Router
- **Backend API:** FastAPI (handled in the `backend/` folder)
- **State Management:** useState, useEffect
- **Storage:** LocalStorage for user session
- **Styling:** CSS modules

---

## **📥 Installation**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Workout-Tracker.git
cd Workout-Tracker/frontend
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Start the Development Server**
```bash
npm run dev
```
By default, the frontend runs at **`http://localhost:5173/`**.

---

## **📌 Project Structure**
```
frontend/
├── src/
│   ├── components/
│   │   ├── CreateForm.jsx  # Form to add new workouts
│   │   ├── EditItem.jsx    # Edit existing workouts
│   │   ├── TodoItem.jsx    # Individual workout item with actions
│   │   ├── TodoWrapper.jsx # Main wrapper for workout routines
│   │   ├── LoginPage.jsx   # User login page
│   ├── App.jsx             # Main application entry
│   ├── main.jsx            # React root component
├── public/
│   ├── index.html          # Main HTML entry point
├── styles/                 # CSS styles
├── package.json            # Project dependencies
└── vite.config.js          # Vite configuration
```

---

## **👤 User Authentication**
- Users must log in before accessing their **Workout Routine**.
- User credentials are **stored in LocalStorage** for session management.
- Each user's data is isolated using their **user_id**.

---

## **🎨 UI Overview**
- **Login Page (`LoginPage.jsx`)** → Authenticates users.
- **Workout Routine (`TodoWrapper.jsx`)** → Manages workout tasks by category.
- **Add/Edit/Delete Workouts (`CreateForm.jsx`, `EditItem.jsx`, `TodoItem.jsx`)** → Enables full CRUD operations.

---

## **✅ Next Steps**
- Add **JWT authentication** instead of LocalStorage for security.
- Improve **error handling and API validation**.
- Deploy both frontend and backend on **AWS/GCP/Heroku**.

---

## **📜 License**
This project is open-source and available under the [MIT License](LICENSE).

---

## **🚀 Contributing**
Feel free to **fork, modify, and submit pull requests**! 😊
