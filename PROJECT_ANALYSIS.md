# Zentora Freelance Marketplace - Complete Architecture & Codebase Analysis

## 1. Executive Summary & Tech Stack

**Zentora** is a full-stack web application designed for a freelance marketplace connecting Clients, Freelancers (Users), and Administrators.

### Technology Stack:
- **Frontend (`ui/`)**: React 19, Vite, React Router DOM v7, React Hook Form + Yup, Bootstrap 5, React Icons, SweetAlert2, Axios.
- **Backend (`API/`)**: Node.js (ES Modules), Express.js 5, Mongoose 9, CORS, Nodemon.
- **Database**: MongoDB (Local instance: `mongodb://localhost:27017/zentora`).

---

## 2. Directory Structure

```
Final Project/
├── API/                          # Backend Express Server
│   ├── Config/
│   │   └── db.js                 # Mongoose connection configuration
│   ├── Controller/
│   │   ├── admincontroller.js    # Admin endpoints (users, projects, clients lists)
│   │   ├── clientcontroller.js   # Client endpoints (post project, project list)
│   │   ├── controller.js         # Auth endpoints (registration, login)
│   │   └── usercontroller.js     # User/Freelancer specific controllers
│   ├── Module/
│   │   └── module.js             # Mongoose Schemas (User & Project models)
│   ├── Router/
│   │   └── router.js             # Express API Routes definition
│   ├── .env                      # Environment variables (PORT=9000, MONGODB_URI)
│   ├── index.js                  # Express entry point & middleware server setup
│   └── package.json              # Backend dependencies
│
└── ui/                           # Frontend React Application
    ├── public/                   # Static assets & Vite logo
    ├── src/
    │   ├── Components/
    │   │   ├── admin/            # Admin Panel Views
    │   │   │   ├── AdminBids.jsx
    │   │   │   ├── AdminClients.jsx
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   ├── AdminPlans.jsx
    │   │   │   ├── AdminProfile.jsx
    │   │   │   ├── AdminProjects.jsx
    │   │   │   └── AdminUsers.jsx
    │   │   ├── client/           # Client Panel Views
    │   │   │   ├── ClientDashboard.jsx
    │   │   │   ├── ClientManageProjects.jsx
    │   │   │   ├── ClientPostProject.jsx
    │   │   │   ├── ClientProfile.jsx
    │   │   │   └── ClientReviewBids.jsx
    │   │   ├── user/             # Freelancer Panel Views
    │   │   │   ├── UserBids.jsx
    │   │   │   ├── UserDashboard.jsx
    │   │   │   ├── UserPlans.jsx
    │   │   │   ├── UserProfile.jsx
    │   │   │   └── UserProjects.jsx
    │   │   ├── AboutUs.jsx
    │   │   ├── ContactUs.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Pricing.jsx
    │   │   ├── Register.jsx
    │   │   └── Services.jsx
    │   ├── App.css               # Global application stylesheet
    │   ├── App.jsx               # Application routes & layout wrapper
    │   ├── index.css             # Base CSS styles
    │   └── main.jsx              # React DOM entry point
    ├── index.html                # HTML template (Google Fonts link)
    └── package.json              # Frontend dependencies
```

---

## 3. Backend Architecture (`API/`)

### A. Database Models (`API/Module/module.js`)
1. **User Schema (`userModel`)**
   - Fields: `name`, `email`, `password`, `type` (`'client'`, `'user'`, `'admin'`), `phone`, `location`, `bio`, `profile`, `headline`, `rate`, `skill`, `credit` (Number), `status` (Boolean, default: `true`), `createdAt` (Date).
2. **Project Schema (`projectModel`)**
   - Fields: `clientId` (String), `client` (String), `title` (String), `desc` / `description` (String), `budget` (String), `time` / `duration` / `timeline` (String), `status` (Boolean, default: `false`), `createdAt` (Date).

### B. Controllers
- **Authentication (`controller.js`)**:
  - `userRegister`: Creates a new user if `email` is unique.
  - `userLogin`: Authenticates credentials (`email` + `password`), attaches `type`, and returns user document.
- **Client Operations (`clientcontroller.js`)**:
  - `postProject`: Saves new project linked with `clientId`, `title`, `desc`, `budget`, `duration`, `time`.
  - `clientProjectList`: Queries projects where `{ clientId }` matches `req.query.clientId`.
- **Admin Operations (`admincontroller.js`)**:
  - `adminUsersList`: Queries users with `{ type: "user" }`.
  - `adminClientsList`: Queries users with `{ type: "client" }`.
  - `adminProjectList`: Queries all projects (`projectModel.find()`).

### C. Routes & Endpoint Mapping (`API/Router/router.js`)
| Endpoint | HTTP Method | Controller Function | Description |
| :--- | :--- | :--- | :--- |
| `/register` | `POST` | `userRegister` | Register new client/user account |
| `/login` | `POST` | `userLogin` | Authenticate account & return user session |
| `/admin-users-list` | `GET` | `adminUsersList` | Retrieve all freelancer accounts |
| `/admin-projects-list` | `GET` | `adminProjectList` | Retrieve all published projects |
| `/admin-clients-list` | `GET` | `adminClientsList` | Retrieve all client accounts |
| `/client-post-project` | `POST` | `postProject` | Create a new project posting |
| `/client-project-list` | `GET` / `POST` | `clientProjectList` | Fetch projects for a specific client |

---

## 4. Frontend Architecture (`ui/`)

### A. Routing & Navigation (`App.jsx` & `Navbar.jsx`)
- **Authentication Pages**: `/login`, `/register`.
- **Public Marketing Pages**: `/`, `/about-us`, `/services`, `/pricing`, `/contact-us`.
- **Admin Portal**: `/admin-dashboard`, `/admin-users`, `/admin-clients`, `/admin-project`, `/admin-bids`, `/admin-profile`, `/admin-plans`.
- **Client Portal**: `/client-dashboard`, `/client-post-project`, `/client-manage-project`, `/client-Review-bids`, `/client-profile`.
- **Freelancer Portal**: `/user-dashboard`, `/user-project`, `/user-bids`, `/user-profile`, `/user-plans`.

### B. Session Management
- Login stores the authenticated user object into `localStorage.getItem('info')`.
- Components extract `info?._id` or `info?.id` and `info?.type` to authorize views and send API request parameters.

---

## 5. Summary of Identified Fixes & Recommendations

1. **Router Method Alignment**: Ensure `API/Router/router.js` handles `GET /client-project-list` using `clientProjectList`.
2. **ID Access Safety**: Always retrieve user ID using `info?._id || info?.id` across all frontend components.
3. **Database Fallback Aliases**: Support both `desc`/`description` and `duration`/`timeline` when building schemas and rendering tables.
4. **Axios Timeout**: Set `{ timeout: 5000 }` on frontend Axios requests to prevent indefinite UI hanging on network issues.
