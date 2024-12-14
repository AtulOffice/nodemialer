const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body; 
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #4CAF50;">Welcome to Our Platform</h2>
      <p>Hi there,</p>
      <p>${message}</p>
      <hr>
      <p style="font-size: 0.9em; color: #888;">Thank you for choosing us! Feel free to reply if you have any questions.</p>
      <footer style="text-align: center; font-size: 0.8em; color: #555;">
        <p>Best Regards,</p>
        <p>Energy Ventures Team</p>
      </footer>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "energyventures.co@gmail.com", 
        pass: "tsge getd rdbl zdyd",
      },
    });

    const mailOptions = {
      from: "energyventures.co@gmail.com",
      to: to,
      subject: subject,
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
