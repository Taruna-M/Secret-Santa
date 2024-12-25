const nodemailer = require("nodemailer");

const SendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.HR_EMAIL,
      pass: process.env.HR_PASS,
    },
  });
  const santa = options.to;
  const receiver = options.receiver;
  const deliveryServices = receiver.services.map((service) => `<li>${service}</li>`).join("");
  const emailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #c41e3a;">Rablo Secret Santa Guidelines 🎄</h2>
    <p>Dear <strong>${santa.participantName}</strong>,</p>
    <p>Season's Greetings! You have been assigned as the Secret Santa for <strong>${receiver.participantName}</strong> this year!</p>
    <p>Here are the details of your assigned recipient:</p>
    <ul>
        <li><strong>Name:</strong> ${receiver.participantName}</li>
        <li><strong>Address:</strong> ${receiver.address}</li>
        <li><strong>Email:</strong> ${receiver.email}</li>
        <li><strong>Phone:</strong> ${receiver.contactNumber}</li>
        <li><strong>Delivery Services:</strong></li>
        ${deliveryServices}
    </ul>
    <p>The spirit of giving is upon us, and we're thrilled to have you as part of our Secret Santa celebration! Please take note of the following guidelines to make this event truly special:</p>
    <hr>
    <h3 style="color: #006400;">Gift Selection</h3>
    <ul>
      <li>Choose a thoughtful gift that fits comfortably within your budget. Remember, there's no minimum limit!</li>
      <li>Use any of the delivery services mentioned by the recepient to ensure timely delivery.</li>
      <li>Double-check the delivery address and contact information before placing the order.</li>
    </ul>
    <h3 style="color: #006400;">Important Deadlines</h3>
    <p><strong>All gifts must be ordered and dispatched by the evening of the same day</strong> to avoid delays.</p>
    <h3 style="color: #006400;">Additional Guidelines</h3>
    <ul>
      <li><strong>Keep It Secret:</strong> Your identity should remain hidden from the recipient until the event ends.</li>
      <li><strong>Be Thoughtful:</strong> Consider the recipient’s preferences when choosing the gift.</li>
      <li><strong>Budget-Friendly Choices:</strong> It’s the thought that counts, not the price.</li>
      <li><strong>Timely Action:</strong> Ensure the gift reaches the recipient without delays.</li>
    </ul>
    <h3 style="color: #006400;">Need Help?</h3>
    <p>For any issues such as webpage access, delivery challenges, or other queries, don’t hesitate to reach out to HR for assistance.</p>
    <p>Let’s make this season memorable with the joy of giving! Thank you for spreading holiday cheer and participating in this delightful event.</p>
    <p>Warm regards,</p>
    <p><strong>Rablo.in</strong></p>
    <p>🎁 😊</p>
  </div>
`;

  const mailOptions = {
    from: transporter.options.auth.user,
    to: santa.email,
    subject: "Rablo Secret Santa Assignment",
    html: emailBody
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = SendEmail;
