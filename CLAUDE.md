# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server with Vite (HMR enabled)
- `npm run build` - Build the production bundle
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Project Architecture

This is a React + Vite application with the following structure:

### Entry Point
- `src/main.jsx`: React application entry point that renders `<App />` into the DOM
- `src/index.css`: Global CSS styles (Bootstrap-based)

### Component Organization
Components are organized in `src/Components/` by feature/user type:

#### Admin Features
- `src/Components/admin/AdminDashboard.jsx`: Main admin dashboard overview
- `src/Components/admin/AdminPlans.jsx`: Manage freelancer credit plans (CRUD operations)
- `src/Components/admin/AdminUsers.jsx`: User management interface
- `src/Components/admin/AdminClients.jsx`: Client management
- `src/Components/admin/AdminProjects.jsx`: Project oversight
- `src/Components/admin/AdminBids.jsx`: Bid monitoring
- `src/Components/admin/AdminProfile.jsx`: Admin profile management

#### Client Features
- `src/Components/client/ClientDashboard.jsx`: Client dashboard overview
- `src/Components/client/ClientProfile.jsx`: Client profile management
- `src/Components/client/ClientManageProjects.jsx`: Project creation and management
- `src/Components/client/ClientPostProject.jsx`: Form to post new projects
- `src/Components/client/ClientReviewBids.jsx`: Review bids on posted projects

#### User/Freelancer Features
- `src/Components/user/UserDashboard.jsx`: Freelancer dashboard overview
- `src/Components/user/UserProfile.jsx`: Freelancer profile management
- `src/Components/user/UserProjects.jsx`: Projects the freelancer is working on
- `src/Components/user/UserBids.jsx`: Bids submitted by the freelancer
- `src/Components/user/UserPlans.jsx`: Subscription plan management

#### Shared Components
- `src/Components/Navbar.jsx`: Navigation header used across all pages
- `src/Components/Footer.jsx`: Site footer
- `src/Components/Pricing.jsx`: Displays available freelancer subscription plans
- `src/Components/Home.jsx`: Landing page hero section
- `src/Components/ArticleSection.jsx`: Blog/articles section
- `src/Components/TrendingSection.jsx`: Trending projects or freelancers
- `src/Components/CategorySection.jsx`: Project categories
- `src/Components/TestimonialSection.jsx`: User testimonials
- `src/Components/CertificateSection.jsx`: Certifications display
- `src/Components/CounterSection.jsx`: Statistics counters
- `src/Components/PartnerSection.jsx`: Partner logos
- `src/Components/TalentSection.jsx`: Featured freelancers
- `src/Components/AboutUs.jsx`: Company information page
- `src/Components/Services.jsx`: Services offered
- `src/Components/ContactUs.jsx`: Contact form
- `src/Components/TrustedSection.jsx`: Trust badges or certifications
- `src/Components/Login.jsx`: Authentication page

### State Management & Data Flow
- React Hooks (`useState`, `useEffect`) for local component state
- React Hook Form (`react-hook-form`) with Yup validation for forms (seen in AdminPlans.jsx)
- Axios for HTTP requests to backend API (`http://localhost:9000`)
- React Router DOM (`react-router-dom`) for client-side routing

### Styling
- Bootstrap 5 utility classes and component classes
- Custom CSS in `src/App.css` and component-specific styling
- Icons from `react-icons` library (Fi, Gi, Md, Si icon sets)

### Key API Endpoints (based on observed usage)
- `GET /admin-get-plans` - Fetch subscription plans (used in Pricing.jsx and AdminPlans.jsx)
- `POST /admin-create-plans` - Create new subscription plan
- `DELETE /admin-delete-plan/:id` - Delete subscription plan

### Common Patterns
1. **Data Fetching**: Components typically use `useEffect` with empty dependency array to fetch data on mount
2. **Form Handling**: Admin forms use `react-hook-form` with Yup schema validation
3. **Notifications**: `sweetalert2` for user feedback modals
4. **Routing**: Protected routes likely implemented (though not visible in snippet - inferred from structure)
5. **Responsive Design**: Bootstrap grid system (`col-*`, `row`, `container-fluid`) for mobile responsiveness

### Development Guidelines
- Follow existing component patterns for consistency
- Maintain separation of concerns: admin/client/user features in respective directories
- Use functional components with hooks
- Keep API service calls in components (consider extracting to service layer for larger apps)
- Preserve Bootstrap utility class usage for styling consistency