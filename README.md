# 🌍 Charipay UI – Frontend (Angular 20)

The frontend application for **Charipay**, a full-stack charity donation platform.  
Built with **Angular 20**, this UI provides a responsive and role-based experience for users to explore campaigns, donate, and manage platform activities.

The project demonstrates modern Angular practices, scalable UI architecture, and seamless integration with a .NET backend.

---

## 🌐 Live Demo  
- 🔗 Web App: https://charipay.azurewebsites.net/  

---


## 🚀 Core Features  

### 🔐 Authentication & Authorization  
- JWT-based authentication  
- Role-based routing (**Admin, Donor, Volunteer**)  
- Route guards for secure navigation  

### 🎯 Campaign Experience  
- Browse featured and active campaigns  
- Campaign detail pages with donation call-to-action  
- Real-time progress display  

### 💳 Donation Flow  
- Support for authenticated and anonymous users  
- Integration with backend donation APIs  
- Clean and intuitive UI flow  

### 🧑‍💼 Admin Dashboard  
- Manage campaigns, charities, and users  
- Structured dashboard UI for administrative actions  

### 🙋 Volunteer Module *(In Progress)*  
- Volunteer opportunity listing  
- Application UI and tracking  

### 📱 Responsive Design  
- Fully responsive layout using Bootstrap  
- Optimized for desktop and tablet usage  

---

## 🏗️ Tech Stack  

- **Framework:** Angular 20 (Standalone Components)  
- **Language:** TypeScript  
- **State Management:** RxJS  
- **UI Library:** Bootstrap 5 + Bootstrap Icons  
- **Routing:** Angular Router (Role-based guards)  
- **API Integration:** RESTful APIs (.NET backend)  

---

## 🧩 Frontend Architecture  

- **Standalone Components** for modular structure  
- **Service-based API integration** for separation of concerns  
- **RxJS for reactive state management**  
- **Route Guards** for authentication and authorization  
- **Environment-based configuration** for API endpoints  

---

## 📂 Project Structure  

```bash
charipay-ui/
├── src/app/
│   ├── core/             # Services, guards, interceptors
│   ├── features/         # Feature modules (campaigns, admin, auth)
│   ├── shared/           # Shared components and utilities
│   ├── layout/           # Navbar, footer, layouts
│   └── app.routes.ts     # Application routing
