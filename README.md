# 🌍ImpactConnect — Volunteer & Opportunity Management Portal

A **MERN Stack** platform that bridges the gap between **NGOs and Volunteers**, enabling NGOs to create and manage volunteering opportunities, while volunteers can browse, apply, and track their participation easily.

🚀 Built with a clean **React + Tailwind** frontend, **Express & MongoDB** backend, and secured with **JWT authentication** for NGOs and **Google OAuth** for Volunteers.

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔐 Authentication Flow](#-authentication-flow)
- [🗂️ Project Structure](#️-project-structure)
- [📊 Dashboard Overview](#-dashboard-overview)
- [📸 Screenshots](#-screenshots)
- [🧾 Environment Variables](#-environment-variables)
- [🧠 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 About the Project
**ImpactConnect** is a volunteer management system where:
- NGOs can **create, edit, and track** volunteering opportunities.
- Volunteers can **browse** various causes and **apply** using **Google login**.
- NGOs can **analyze data** (volunteer trends, participation per month) using interactive charts.

> This system streamlines collaboration between NGOs and volunteers — creating a centralized, transparent, and efficient way to engage in social initiatives.

---

## ✨ Features

### 👥 For Volunteers
- 🔑 **Google OAuth** authentication for instant sign-in.  
- 🧾 View all NGO opportunities (filter by category & location).  
- 🗓️ Apply instantly to volunteering posts.  
- ⏰ Application stored with current date (for analytics).  
- 📅 View all volunteering applications in one place.  

### 🏢 For NGOs
- 🔒 **JWT-based authentication** (email/password signup & signin).  
- 📝 Create, update, and delete volunteering opportunities.  
- 📊 Dashboard with real-time insights:
  - Active vs Completed projects.
  - Month-wise volunteer applications (Bar Chart).
- 👀 View applicants for each post with date & details.
- 🧾 Manage feedback & ratings from volunteers.

### 💎 General
- 🌑 Modern **dark dashboard UI** using Tailwind CSS.  
- 📈 Interactive charts with **Recharts**.  
- ⚡ Fully responsive design.  
- 🧠 Clean and reusable React components.  
- 🛡️ Protected routes for authenticated users.  

---

## 🧰 Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| **Frontend** | React.js, React Router, Tailwind CSS, Axios, Recharts |
| **Backend** | Node.js, Express.js, JWT, Bcrypt.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (NGOs), Google OAuth (Volunteers) |
| **Tools** | dotenv, nodemon, Cloudinary (optional for media) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/studentanush/CEP-project.git
```


## 🔐 Authentication Flow

### 👨‍💻 NGO Login
- NGOs sign up and sign in using **email & password**.
- Authentication is handled using **JWT tokens**.
- Token is stored securely in `localStorage` and attached to all protected API requests.
- Only logged-in NGOs can:
  - Post opportunities
  - Edit or delete posts
  - View applied volunteers
  - Access feedback dashboard

### 🙋 Volunteer Login
- Volunteers sign in using **Google OAuth 2.0**.
- After successful login:
  - Volunteer data is securely stored in the database.
  - They can browse, apply, and track volunteering activities.
- A volunteer cannot apply multiple times for the same post.
- Each application also stores the **date** for analytics and dashboard tracking.

---

## 📊 Dashboard Overview

The dashboard provides a centralized interface for both **Organizations** and **Volunteers** to manage their activities efficiently.

### 🏢 NGO Dashboard (Organization)
- **Manage Posts:** Create, update, and delete volunteer opportunities.  
- **View Applicants:** See volunteers who have applied to specific posts.  
- **Analytics Section:** Visual representation of volunteer trends (e.g., number of volunteers joining each month).  
- **Feedback Panel:** NGOs can track engagement and responses from volunteers.  

### 🙋 Volunteer Dashboard
- **Apply to NGO Events:** Browse and apply to various NGO drives.  
- **Track Applied Events:** View all applications and their current status.  
- **Google Authentication:** Volunteers can sign in using **Google OAuth** for a smooth experience.  
- **Profile Section:** View personal details and applied opportunities.

---

## 🖼️ Screenshots

### 🏠 Home Page
<img width="1890" height="884" alt="image" src="https://github.com/user-attachments/assets/7c4c4606-b8ab-4116-b5a9-dc66c884d9ce" />

### 🔐 Authentication (Google OAuth)

<img width="1877" height="892" alt="image" src="https://github.com/user-attachments/assets/0fe99145-e9ea-4e93-9cc0-76d643ea0b2b" />

### 📋 NGO Dashboard

<img width="1896" height="891" alt="image" src="https://github.com/user-attachments/assets/19a1bf38-3e49-4981-8f4f-46c014a807b7" />

### 🙋 Volunteer Dashboard

<img width="1896" height="917" alt="image" src="https://github.com/user-attachments/assets/842f6576-9541-4f1b-9bde-da51a2cc38dd" />


### 📈 FeedBack Sections 
![Analytics Chart](./screenshots/analytics.png)



---

## 🚀 Future Enhancements

- **💬 Real-time Chat:** Enable communication between NGOs and volunteers.  
- **📅 Toggle button:** Enable Toggle from dark to light background and vice versa.  
- **📍 Location Integration:** Add Google Maps API for displaying event locations.  
- **📱 Mobile-Friendly UI:** Fully responsive mobile interface with optimized performance.  
- **🔔 Notifications:** Email or push notifications for new opportunities or updates.  
- **⭐ Volunteer Badges:** Reward system for active volunteers based on participation.  
- **🧠 AI-based Recommendations:** Suggest volunteer opportunities based on skills and interests.

---




