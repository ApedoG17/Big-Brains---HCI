# 🌶️ Pepper Dem

**A Premium Ghanaian Comfort Food Delivery Application**

> *Built for Big Brains — HCI Project*

Pepper Dem is a full-stack, real-time web application designed to provide a seamless, premium food ordering experience. It focuses on intuitive HCI (Human-Computer Interaction) principles, micro-animations, and a highly responsive layout.

---

## 🚀 Features

- **Premium UI/UX:** A stunning, responsive design with smooth page transitions, tactile buttons, and hover-lift micro-animations.
- **Smart Checkout:** An intuitive checkout flow with auto-filling user details and a fallback interactive map for pinning delivery locations.
- **Real-Time Order Tracking:** Users can track their orders live. As the kitchen updates the status, the customer's progress bar animates forward via WebSockets (no refresh needed).
- **Kitchen Display System (KDS):** A dedicated live dashboard for kitchen staff. New orders pop up instantly, and staff can drag tickets through a kanban-style board (Pending ➔ Preparing ➔ Ready ➔ Delivered).
- **Full Authentication:** Secure login and registration using JWT authentication, with session persistence.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Vanilla CSS (Custom Design System)
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Real-time Engine:** Socket.io (WebSockets)
- **Maps:** Leaflet & React-Leaflet

## 📦 Getting Started

To run this project locally, you will need to start both the backend server and the frontend client.

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and configure your `JWT_SECRET`.
4. Run the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will launch on `http://localhost:5173`.*

## 🎨 Design Philosophy

This project was built with strict adherence to modern HCI principles:
- **Feedback & Responsiveness:** Every interaction (hover, click, order status change) provides immediate visual or haptic-style feedback to the user.
- **Error Prevention:** Forms validate aggressively, and checkout defaults are intelligent (e.g., auto-filling name for authenticated users).
- **Aesthetic Integrity:** Warm colors (Reds/Yellows/Creams) were chosen to stimulate appetite and reflect Ghanaian culture, while maintaining a clean, modern aesthetic.

---
*Created by the Big Brains team.*