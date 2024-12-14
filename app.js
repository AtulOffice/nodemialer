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
  const { to, otp } = req.body;
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; border-radius: 10px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50; text-align: center;">Welcome to Energy Ventures</h2>
      <p style="font-size: 1.1em; color: #333; text-align: center;">Hello!</p>
      <p style="text-align: center; font-size: 1em; color: #555;">
        We are thrilled to have you with us. Use the OTP below to complete your verification process.
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 1.5em; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 1em; color: #555; text-align: center;">
        This OTP is valid for 10 minutes. Please do not share it with anyone.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <footer style="font-size: 0.9em; text-align: center; color: #999;">
        <p>Best Regards,</p>
        <p><strong>Energy Ventures Team</strong></p>
        <p>Contact us at <a href="mailto:energyventures.co@gmail.com" style="color: #4CAF50;">energyventures.co@gmail.com</a></p>
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
      subject: "Your OTP for Verification",
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).send("OTP email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send OTP email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
