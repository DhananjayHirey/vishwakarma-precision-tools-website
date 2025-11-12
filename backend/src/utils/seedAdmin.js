import { User } from "../models/user.model.js";

import dotenv from "dotenv";
import connectDB from "../db/db.js";

dotenv.config({
    path: '../../.env'
})




const ADMIN_EMAIL = "testadmin@gmail.com";
const ADMIN_PASSWORD = "Admin@12345";
const ADMIN_FULLNAME = "Test Admin";
const ADMIN_USERNAME = "testadmin";

connectDB().then(async () => {
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL, role: "admin" });
    if (existingAdmin) {
        console.log("Admin user already exists. Skipping seeding.");
        process.exit(0);
    }
    const adminUser = new User({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_FULLNAME,
        username: ADMIN_USERNAME,
        avatar: "",
        role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created successfully.");
}).catch((error) => {
    console.error("Error creating admin user:", error);
}).finally(() => {
    process.exit(0);
}); 
