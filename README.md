# 🎨 HomePulse Frontend (React + TypeScript + 3D Viewer)

HomePulse Frontend is the user interface for the smart-home ecosystem.  
It includes dashboards, device views, home/room management, and a fully interactive 3D immersive room viewer based on Gaussian Splats.

---

## ✨ Features

- Modern UI built with React + TypeScript  
- Live device updates via WebSockets  
- Create/manage homes and rooms  
- Upload 3D splat models of rooms  
- Immersive 3D room viewer with device overlays  
- Real-time MQTT values shown inside 3D space  
- Login & protected routes  
- Zustand state management  
- Tailwind + shadCN components  

---

## 🗂 Project Structure

```
client/
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

## 📌 User Flow (Frontend)

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
- Clicking a device shows **live MQTT data**  
- UI updates in real-time via WebSockets  

This builds a spatial digital twin of the room.

---

## 🎛 Dashboard

The dashboard shows:
- Homes  
- Rooms  
- Devices  
- MQTT live data  
- Online/offline statuses  

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
- TypeScript  
- Vite  
- Tailwind CSS  
- shadCN UI  
- Zustand  
- WebSockets  

---

## 💻 Installation & Setup

### 1. Clone repo
```bash
git clone <repo-url>
cd HomePulse
```

### 2. Frontend setup
```bash
cd client
npm install
npm run dev
```

Open in browser:
`http://localhost:5173`

---

## 📄 License

Private project – internal development only.
