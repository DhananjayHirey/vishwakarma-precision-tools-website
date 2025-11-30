const razorpay = require("razorpay");

export const createRazorpayInstance = () => {
  return new razorpay({
    key_id: process.env.RZP_TEST_API_KEY,
    key_secret: process.env.RZP_TEST_KEY_SECRET,
  });
};
