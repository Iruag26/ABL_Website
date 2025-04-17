```markdown
# 🚀 ABL Website - Activity-Based Learning Portal

A dynamic web portal to track, verify, and report student co-curricular and extra-curricular activities for **FR. C. Rodrigues Institute of Technology** (Autonomous), Vashi, Navi Mumbai.

![Made with PERN](https://img.shields.io/badge/Made%20With-PERN-blueviolet?style=for-the-badge&logo=postgresql)  
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

---

## 🧩 Features

- ✅ Role-based login for Admin, Student, Mentor, and Club Admin  
- 🗃️ Student activity tracking with mentor approval system  
- 📊 Visual batch insights using charts  
- 📅 Event calendar and announcements  
- 📥 Certificate submission + verification workflow  
- 📄 PDF report generation for final-year students  
- 💾 PostgreSQL database with Sequelize ORM

---

## 📁 Project Structure

```
ABL_Website/
├── client/               # React frontend
│   ├── Pages/
│   ├── Components/
│   └── api/
│   └── assets/
├── server/               # Node + Express backend
│   ├── controllers/
│   ├── models/
│   └── routes/
└── README.md
```

---

## ⚙️ Tech Stack

- **Frontend:** React, Bootstrap, Chart.js, Axios  
- **Backend:** Node.js, Express.js, Sequelize ORM  
- **Database:** PostgreSQL  
- **PDF Generation:** jsPDF + html2canvas

- ![React](https://img.shields.io/badge/Frontend-React-blue?logo=react&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple?logo=bootstrap&logoColor=white)
- ![Chart.js](https://img.shields.io/badge/Charts-Chart.js-orange?logo=chartdotjs&logoColor=white)
- ![Axios](https://img.shields.io/badge/API-Axios-blue?logo=axios&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Server-Express-black?logo=express&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/ORM-Sequelize-teal?logo=sequelize&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql&logoColor=white)
- ![jsPDF](https://img.shields.io/badge/PDF-jsPDF-red?logo=javascript&logoColor=white)
- ![html2canvas](https://img.shields.io/badge/Screenshot-html2canvas-lightgrey)


---

## 🚀 Deployment Plans

| Service               | Role                  |
|----------------------|-----------------------|
| Render               | Backend + PostgreSQL  |
| GitHub Pages / Vercel| Frontend              |

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Iruag26/ABL_Website.git
cd ABL_Website
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in `/server` with the following content:

```env
DATABASE_URL=your_postgres_connection_string
PORT=5000
```

### 4. Start the Project Locally

**Start Backend:**
```bash
cd server
npm start
```

**Start Frontend:**
```bash
cd client
npm run dev
```

---

## 📝 PDF Report Demo

The admin can generate a report PDF for final-year students with all their approved activities and total points.  
The report includes:

- Institute header  
- Student details  
- Activity table  
- Signature placeholders  

Styled for professional output.

---

## 🎓 Academic Context

This portal was developed with ❤️ as part of the final-year engineering project  
under the Department of Computer Engineering, FCRIT (Autonomous), Navi Mumbai.
```
