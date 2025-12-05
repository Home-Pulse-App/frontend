# 🎨 HomePulse Frontend (React + TypeScript + 3D Viewer)

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16-green)](#)
[![TypeScript](https://img.shields.io/badge/typescript-4.x-blue)](#)
[![React](https://img.shields.io/badge/react-18-blue)](#)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Home-Pulse-App/frontend/ci.yml?branch=main)](https://github.com/Home-Pulse-App/frontend/actions)
[![Coverage Status](https://img.shields.io/badge/coverage-%%25-brightgreen)](#)
[![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-green)](#)
![splat-viewer](https://img.shields.io/badge/splat-viewer-supported-blue?style=flat)

HomePulse Frontend is the user interface for the smart-home ecosystem.

It includes dashboards, device views, home/room management, and a fully interactive 3D immersive room viewer based on Gaussian Splats.

---

## ✨ Features

- Modern UI built with React + TypeScript
- Live device updates
- Create/manage homes and rooms
- Upload 3D splat models of rooms
- Immersive 3D room viewer with device overlays
- Real-time MQTT values shown inside 3D space
- Login & protected routes
- Zustand state management
- Tailwind + shadCN + React Bits components

---

## 🗂 Project Structure

```
frontend/
  └── src/
      ├── assets/
      ├── components/
      ├── lib/
      ├── pages/
      ├── services/
      ├── store/
      ├── types/
      ├── App.tsx
      ├── main.tsx
      ├── protectedRoute.tsx
      ├── immersiveStyle.css
      ├── main.css
      └── svg.d.ts
```

Key elements:

- **pages** – UI pages
- **components** – reusable interface blocks
- **services** – API calls
- **store** – Zustand state
- **types** – TypeScript interfaces
- **lib** – helper libraries

---

## 📌 User Flow

After login, the UI offers:

- Home overview
- List of homes/rooms/devices
- Add/delete homes
- Add rooms with 3D model uploads
- Device lists with real-time values
- Full dashboard

---

## 🧭 Immersive 3D Room View (Gaussian Splats)

This feature is **fully implemented**.

When clicking **Immersive View** inside a room:

- A 3D Gaussian Splat model loads
- All devices appear at correct spatial positions
- Clicking a device shows and sets **live MQTT data**
- UI updates in real-time

This builds a spatial digital twin of the room.

---

## 🎛 Dashboard

The dashboard shows:

- Homes
- Rooms
- Devices
- MQTT live data
- Online/offline status

Simple, clean UI for full smart-home visibility.

---

## 🔐 Authentication

Includes:

- Login
- Registration
- Protected routes
- JWT stored securely

---

## 🛠 Tech Stack (Frontend)

- React
- R3F
- Three.js
- Sparkjs.dev
- TypeScript
- Vite
- Tailwind CSS
- shadCN UI
- Zustand
- React Bits

---

## 💻 Installation & Setup

### 🧬 Clone repo

```bash
git clone https://github.com/Home-Pulse-App/frontend.git
cd frontend
```

### 🧱 Frontend setup

```bash
npm install
npm run dev
```

### 🌐 Open in browser

🔗 : `http://localhost:5173`
