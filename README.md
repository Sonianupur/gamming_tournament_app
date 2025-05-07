# 🎮 Gaming Tournament App

An interactive web application for browsing, managing, and registering for gaming tournaments, built with React, Next.js, Firebase, and Leaflet. It supports both admin and user roles, an interactive tournament map, and user-friendly dashboards.

---

## 🚀 Features

### 🧑‍💻 User
- Secure Authentication via Firebase (Signup/Login with role-based access)

- User Dashboard with access to search, registration, and history

- Browse & Search Tournaments by title, date, and location

- Register for Tournaments with real-time spot availability

- View & Cancel Registrations through a personal history list

- Interactive Map using Leaflet (no React wrapper) with clickable tournament markers

- Logout Securely at any time


### 👩‍💼 Admin

- Full Admin Dashboard with role-restricted access

- View All Tournaments in a comprehensive list

- Add New Tournaments with title, date, and geolocation (latitude/longitude)

- Edit & Manage Tournaments including updates and spot tracking

- Interactive Map to visualize and manage tournament locations

- View Registration History for all events

- Cancel Tournaments as needed

- Logout Securely at any time

## 👥 Test Login Credentials

### 👤 Admin
- **Email**: `admin@email.com`
- **Password**: `admin123`

### 👤 User
- **Email**: `user@email.com`
- **Password**: `user123`


### 🗺️ Map Integration
- Powered by Leaflet.js (no `react-leaflet`)
- Dynamic map markers loaded from Firestore
- Clickable markers show tournament info and registration link

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **Firebase (Auth + Firestore)**
- **Leaflet.js** (interactive map without react-leaflet)
- **Tailwind CSS** (styling)
- **JavaScript / TypeScript**
- git clone https://github.com/Sonianupur/gamming_tournament_app.git
cd gamming_tournament_app


How to Run the Project (Locally)

### 📥 Step 1: Unzip and Open the Project
- Extract the ZIP file into a folder on the system.
- Open it in **VS Code** or any preferred IDE.

### 🧱 Step 2: Install Dependencies
In the terminal, run:

```bash
npm install
npm install leaflet
```

### 🔑 Step 3: Configure Firebase
In .env file  the  Firebase configuration remains.

REACT_APP_FIREBASE_API_KEY=AIzaSyDoWMdgbud9uwsnL3MXp94CPdelk98WNjs
REACT_APP_FIREBASE_AUTH_DOMAIN=gammingtournamentapp.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=gammingtournamentapp
REACT_APP_FIREBASE_STORAGE_BUCKET=gammingtournamentapp.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=227833148768
REACT_APP_FIREBASE_APP_ID=1:227833148768:web:888e1ca66645531f61da05
REACT_APP_FIREBASE_MEASUREMENT_ID=G-M3D08B4MEX
```

> Ensure that:
> - Firebase Authentication is enabled (email/password)
> - Firestore has 3 collections: `users`, `tournaments`, `registrations`
> - Each tournament document contains `latitude` and `longitude` fields

### ▶️ Step 4: Run the App

```bash
npm run dev
```

Then the browser can be opened to:  
👉 **http://localhost:3000**

---

##  Example Firebase Data

### ✅ `users` collection:
```json
{
  "email": "admin@email.com",
  
  "role": "admin"
}
```

### ✅ `tournaments` collection:
```json
{
  "title": "Football Clas",
  "date": "2025-07-01",
  "location": "Solent hall c",
  "latitude": 52.9548,
  "longitude": -1.1581,
  "totalSpots": 20,
  "remainingSpots": 7,
  "registeredUsers": []
}
```

---

## 🌐 Notes

- The `node_modules` folder is not included in the ZIP file.
- If Leaflet icons do not render, ensure proper static handling (already fixed in the code).
- Map markers will only appear if valid coordinates are in the Firestore documents.

---

## 👨‍🏫 Project Use

This project is submitted for academic purposes only. Feel free to explore and extend it further.



