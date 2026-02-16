# Budget Planner

A modern, feature-rich budget planning application built with React and Vite. This application helps users track their expenses, manage transactions, and set financial goals to achieve better financial control.

## Features

- **User Authentication**: Secure login and registration system with JWT token-based authentication
- **Transaction Management**: 
  - Add transactions with categories
  - View transactions organized by date
  - Delete transactions
  - Real-time balance updates
- **Goal Tracking**: 
  - Create financial goals with custom icons
  - Track progress toward goals
  - Update and delete goals
- **Category System**: Organize transactions by predefined categories (Food, Transportation, Entertainment, etc.)
- **Dashboard**: 
  - View user balance
  - Quick access to add transactions
  - Overview of all transactions and goals
- **Modern UI**: Built with Chakra UI for a responsive and accessible user interface
- **Dark Mode Support**: Theme switching capability using next-themes

## Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **UI Library**: Chakra UI 3.19.1
- **Routing**: React Router DOM 7.6.1
- **HTTP Client**: Axios 1.9.0
- **Date Handling**: date-fns 4.1.0
- **Icons**: 
  - React Icons 5.5.0
  - Iconify React 6.0.0
- **Theme Management**: next-themes 0.4.6
- **Code Quality**: ESLint with React plugins

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- A running backend API server (see API Configuration section)

## Setup Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd budget-planner-fe
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 3. Configure API Endpoint

The application is configured to connect to a backend API. By default, it expects the backend to be running at `http://localhost:8080`.

To change the API endpoint, edit `src/api/index.js` and update the `API_BASE_URL` constant:

```javascript
const API_BASE_URL = 'http://your-backend-url:port';
```

### 4. Start the Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

Using pnpm:
```bash
pnpm dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is occupied). Open your browser and navigate to this URL.

### 5. Build for Production

To create a production build:

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

Using pnpm:
```bash
pnpm build
```

The production-ready files will be generated in the `dist` directory.

### 6. Preview Production Build

To preview the production build locally:

Using npm:
```bash
npm run preview
```

Using yarn:
```bash
yarn preview
```

Using pnpm:
```bash
pnpm preview
```

## Project Structure

```
budget-planner-fe/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration and endpoints
│   │   ├── index.js       # Axios setup and API functions
│   │   └── mockData.json  # Mock data (if used)
│   ├── assets/            # Images, icons, and other assets
│   │   └── icons/         # SVG icons for categories and goals
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Chakra UI wrappers)
│   │   ├── AddGoalDialog.jsx
│   │   ├── AddTransactionDialog.jsx
│   │   ├── AddTransactionForm.jsx
│   │   ├── GoalItem.jsx
│   │   ├── GoalList.jsx
│   │   ├── Header.jsx
│   │   ├── SidePanel.jsx
│   │   ├── TransactionItem.jsx
│   │   ├── TransactionList.jsx
│   │   └── UpdateGoalDialog.jsx
│   ├── pages/            # Page components
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── util/             # Utility functions
│   │   └── util.js       # Date formatting and helper functions
│   ├── App.jsx           # Main app component with routing
│   ├── App.css           # App-specific styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## API Configuration

The application expects a backend API with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/sign-up` - User registration

### Transactions
- `GET /api/transaction/list` - Get all transactions
- `POST /api/transaction/add` - Add a new transaction
- `DELETE /api/transaction/:id` - Delete a transaction

### User Information
- `GET /api/info/user` - Get user information and balance
- `GET /api/info/categories` - Get available transaction categories

### Goals
- `GET /api/goal/list` - Get all user goals
- `POST /api/goal/add` - Create a new goal
- `POST /api/goal/:id` - Update a goal
- `DELETE /api/goal/:id` - Delete a goal

All API requests (except authentication) require a JWT token stored in localStorage under the key `token`.

## Development Notes

- The application uses React Router for client-side routing
- Authentication tokens are stored in localStorage
- The app automatically redirects to `/login` on 401 errors
- All API calls are intercepted to add authentication headers
- The application uses Chakra UI's component system for consistent styling
