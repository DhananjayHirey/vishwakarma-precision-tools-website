import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendReceipt = async (email, id, price, items = []) => {
  const date = new Date().toLocaleString();
  console.log(items);
  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">₹${item.price}</td>
        </tr>
      `
    )
    .join("");

  const msg = {
    to: email.toString(),
    from: process.env.SENDGRID_VERIFIED_SENDER,
    subject: "Your VPT Receipt",
    text: `Thank you for your purchase! Order ID: ${id} | Total: ₹${price}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="text-align: center;">VPT Receipt</h2>
        <p>Thank you for your purchase! Below are your order details:</p>

        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> ${id}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Total Amount Paid:</strong> ₹${price}</p>

        ${
          items.length
            ? `
        <h3>Items</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="padding: 8px; border: 1px solid #ddd; background: #f8f8f8;">Item</th>
              <th style="padding: 8px; border: 1px solid #ddd; background: #f8f8f8;">Qty</th>
              <th style="padding: 8px; border: 1px solid #ddd; background: #f8f8f8;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        `
            : ""
        }

        <p>If you have any questions, feel free to contact our support team.</p>

        <p style="text-align:center; margin-top:20px;">
          <strong>Thank you for choosing Vishwakarma Precision Tools!</strong>
        </p>
      </div>
    `,
  };

  sgMail
    .send(msg)
    .then(() => console.log("Receipt sent"))
    .catch((error) => console.error(error));
};
