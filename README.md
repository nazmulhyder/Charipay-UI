# 🌍 Charipay – Frontend (Angular)

A modern Angular-based frontend for Charipay, a UK-first charity platform that enables users to discover campaigns, donate securely, and participate in volunteer activities.

---

## 🚀 Live Demo

- 🌐 Frontend: https://charipay.azurewebsites.net  
- 📡 Backend API: https://charipay-web-api.azurewebsites.net/swagger/index.html  

---

## 🎯 Overview

The Charipay frontend provides a clean and responsive user interface for:

- Browsing charity campaigns  
- Making donations (anonymous or logged-in)  
- Managing donor and volunteer activities  
- Accessing role-based dashboards  

The application is built with a focus on usability, clarity, and real-world user flows.

---

## ✨ Features

### 🏠 Public Pages
- Homepage with hero, stats, and call-to-action  
- Campaign listing and details page  
- About page  
- How It Works page (Donor & Volunteer journeys)  

### 🔐 Authentication
- User registration (Donor / Volunteer)  
- Login with JWT authentication  
- Role-based redirection  

### 💰 Donation Flow
- Campaign → Donate → Success flow  
- Support for anonymous donations  
- Logged-in donation tracking  

### 👤 Donor Features
- Donor dashboard  
- View donation history  
- Track supported campaigns  

### 🙋 Volunteer Features
- Browse volunteer opportunities  
- Apply / cancel applications  
- Status tracking (Pending, Approved, Cancelled, Completed)  

### 🧭 Navigation & UX
- Responsive navbar (role-aware)  
- Clean footer with quick links  
- Form validation and error handling  
- Loading states for API calls  

---

## 🧰 Tech Stack

- Angular 20
- TypeScript  
- Bootstrap 5  
- RxJS  
- Angular Router (role-based layouts)  

---

## 🏗️ Application Structure

```bash
src/
 ├── app/
 │   ├── core/          # Services, guards, interceptors
 │   ├── features/      # Feature modules (campaigns, auth, dashboard)
 │   ├── layouts/       # Layout components
 │   ├── shared/        # Shared UI components
 │   └── app-routing.module.ts
```
