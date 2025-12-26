# 🛠️ Vishwakarma Precision Tools Website

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vishwakarma-precision-tools-website-phi.vercel.app)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern, full-stack e-commerce platform for Vishwakarma Precision Tools, built with cutting-edge technologies to provide a seamless shopping experience for precision tools and equipment.

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based user authentication with role-based access control
- 🛒 **Advanced Shopping Cart**: Persistent cart with real-time updates
- 💳 **Secure Payments**: Integrated Razorpay payment gateway for seamless transactions
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS and Radix UI components
- 👨‍💼 **Admin Dashboard**: Comprehensive admin panel for product and order management
- 📊 **Analytics & Metrics**: Sales metrics and order tracking for administrators
- 🖼️ **Image Management**: Cloudinary integration for optimized product images
- 📧 **Email Notifications**: Automated email receipts and notifications via SendGrid
- 🎨 **Modern UI**: Beautiful, accessible interface with smooth animations
- 🔍 **Product Search & Filtering**: Advanced search and categorization
- 📦 **Order Management**: Complete order lifecycle management
- 🌙 **Dark/Light Mode**: Theme switching capability

## 🏗️ Architecture

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: TanStack Router
- **Charts**: Recharts for analytics visualization

### Backend

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet for security headers, bcrypt for password hashing
- **File Uploads**: Multer for multipart form data

## 🔧 Services & Integrations

| Service                | Purpose                                | Provider                              |
| ---------------------- | -------------------------------------- | ------------------------------------- |
| **Payment Processing** | Secure online payments                 | [Razorpay](https://razorpay.com/)     |
| **Image Storage**      | Product image hosting and optimization | [Cloudinary](https://cloudinary.com/) |
| **Email Service**      | Transactional emails and notifications | [SendGrid](https://sendgrid.com/)     |
| **Database**           | NoSQL database for data persistence    | [MongoDB](https://www.mongodb.com/)   |
| **Deployment**         | Frontend hosting and CDN               | [Vercel](https://vercel.com/)         |
| **Backend Hosting**    | API server hosting                     | Custom deployment                     |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/vishwakarma-precision-tools-website.git
   cd vishwakarma-precision-tools-website
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Create .env file with required variables
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend-new
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/vishwakarma-tools
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend Development Server**

   ```bash
   cd frontend-new
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📡 API Endpoints

### Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin)

### Payments

- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Admin

- `GET /api/admin/dashboard` - Dashboard metrics
- `GET /api/admin/users` - User management
- `GET /api/admin/orders` - Order management

## 🗂️ Project Structure

```
vishwakarma-precision-tools-website/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration files
│   │   └── db/             # Database connection
│   └── package.json
├── frontend-new/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # State management
│   │   ├── api/            # API client functions
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

## 🧪 Testing

```bash
# Run frontend tests
cd frontend-new
npm run test

# Run backend tests (if implemented)
cd backend
npm run test
```

## 🚢 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables in Vercel dashboard

### Backend

Deploy to your preferred hosting service (Heroku, Railway, DigitalOcean, etc.) and configure environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please contact:

- Email: support@vishwakarmatools.com
- Website: [Vishwakarma Precision Tools](https://vishwakarma-precision-tools-website-phi.vercel.app)

---

Made with ❤️ for precision tool enthusiasts
