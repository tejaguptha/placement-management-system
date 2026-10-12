# Placement Management System

A clean, professional full-stack MERN placement portal with three dedicated role profiles:
- **Student**: View eligible placement drives, apply, track status, update profile.
- **Company**: Post placement drives, specify criteria, review applicants, change status (Shortlist/Select/Reject).
- **Administrator**: View university placement stats, manage students and companies, oversee applications.

---

## Project Structure

```text
├── api/
│   └── index.js             # Vercel Serverless Function entry point
├── backend/
│   ├── config/              # MongoDB connection with serverless connection caching
│   ├── middleware/          # JWT authentication & role-based authorization
│   ├── models/              # Mongoose models (User, Opportunity, Application)
│   ├── routes/              # Express API route modules
│   ├── app.js               # Express app configuration & middleware
│   ├── server.js            # Standalone dev server / runner
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── src/                 # React + Vite application source
│   ├── index.html           # SPA HTML entry point
│   ├── package.json         # Frontend dependencies & Vite scripts
│   └── vite.config.js       # Vite configuration
├── .env.example             # Template for environment variables
├── package.json             # Root project scripts & serverless dependencies
├── vercel.json              # Vercel deployment configuration & rewrites
└── README.md
```

---

## Deploying to Vercel (1-Click Ready)

This repository is configured to deploy seamlessly as a unified full-stack application on Vercel.

### Step 1: Import Repository
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import your GitHub repository (`tejaguptha/placement-management-system`).
4. **Root Directory**: Leave as default (`./` or empty).
5. **Framework Preset**: Vercel will auto-detect Vite or Other (leave as default). The build settings are governed by `vercel.json`.

### Step 2: Set Environment Variables
In the Vercel project configuration screen (under **Environment Variables**), add the following:

| Variable | Description | Example / Default |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (**Required**) | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/placementDB?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for signing auth tokens (**Required**) | `your_long_random_jwt_secret_key` |
| `ADMIN_NAME` | Name for initial default administrator | `Placement Administrator` |
| `ADMIN_EMAIL` | Email for initial default administrator | `admin@placementhub.com` |
| `ADMIN_PASSWORD` | Password for initial default administrator | `Admin@12345` |

> **MongoDB Atlas Network Access Tip:** Ensure your MongoDB Atlas cluster has IP Access list configured to allow connections from anywhere (`0.0.0.0/0`), which is required for dynamic serverless functions on Vercel.

### Step 3: Deploy
Click **Deploy**.
- The frontend will be built automatically into `frontend/dist`.
- The backend API will be deployed as a Serverless Function at `/api`.
- You can test the API health check directly at: `https://<your-project>.vercel.app/api/health`.

---

## Running Locally

### 1. Root Installation & Dev
```bash
# Install root dependencies
npm install

# Start backend locally (port 5000)
npm run server

# In another terminal, start frontend locally (port 5173)
npm run client
```

### 2. Configure Local `.env`
Create `.env` in the root (or `backend/.env`):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@placementhub.com
ADMIN_PASSWORD=Admin@12345
PORT=5000
```

Frontend runs on `http://localhost:5173` and automatically proxies `/api` requests to `http://localhost:5000`.
