# 🍔 Burger Hut
**A streamlined burger ordering web application built to provide users with a seamless online dining experience.**

## 🔗 Live Demo
[**Burger Hut**](https://burger-hut-app.vercel.app/)

---

## 🚀 Features
### **User Features**
- 🛒 **Explore & Order Burgers:** Browse a delicious menu and customize your order.
- 🔒 **Secure Authentication:** Leverages **NextAuth** for secure user login and registration.
- 📜 **Order History:** View previous orders and track current orders in real-time.

### **Admin Panel**
- 🖋️ **Menu Management:** Add, update, or remove menu items seamlessly.
- 📊 **Order Management:** Track and manage incoming orders.
- 🔑 **Role-Based Access Control:** Admin privileges for managing the platform.

---

## 🛠️ Tech Stack
- **Frontend:** [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Node.js, MongoDB
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Deployment:** Vercel  

---

## 🚧 Installation & Setup

### **Prerequisites**
- Node.js >= 14.x
- MongoDB database

### **Steps**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Pranava26/Burger-Hut---A-Burger-ordering-website.git
   cd Burger-Hut---A-Burger-ordering-website

2. **Install Dependencies:**
   ```bash
   npm install

3. **Set Up Environment Variables:**
   Create a .env.local file in the root directory and configure the following keys:
   ```bash
   MONGODB_URI=<your_mongodb_connection_string>
   NEXTAUTH_URL=<your_deployed_url_or_localhost>
   NEXTAUTH_SECRET=<your_nextauth_secret>

4. **Run the Development Server:**
   ```bash
   npm run dev

5. **Build for Production:**
   ```bash
   npm run build
   npm start

6. **Admin Credentials Setup:**
   Add admin user credentials directly to the database for managing menu items and orders.

---

## 🛡️ Security
Burger Hut takes the following measures to ensure data security:
- **Authentication**: NextAuth.js ensures secure handling of user sessions.
- **Password Protection**: Passwords (if applicable) are hashed using bcrypt.
- **Role Management**: Admin access is protected by role-based access control.

---

## 📢 Feedback & Contributions
I welcome your feedback and contributions to improve Burger Hut!

---

## 🙌 Acknowledgments
- [Next.js](https://nextjs.org/): For providing an excellent framework.
- [Tailwind CSS](https://tailwindcss.com/): For its intuitive styling.
- [MongoDB](https://www.mongodb.com/): For a reliable database solution.
