import axios from "axios";
import nodemailer from "nodemailer";

export async function sendMail(req, res) {
  if (req.method === "POST") {
    const { surveyLinks, courseName, courseCode } = req.body;

    try {
      let transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: "testtestetqan@outlook.com",
          pass: "123456et-",
        },
      });

      // Introductory paragraph
      const introText = `For students enrolled in course: ${courseName}, [${courseCode}], `;

      // Extract the text from the array of strings and join them with line breaks
      const surveyLinksText = surveyLinks.join("\n");

      // Complete email text
      const emailText = `${introText}\n\nPlease use the following links to fill out the surveys for the CLOs of the course [${courseName}]:\n\n${surveyLinksText}`;

      let mailOptions = {
        from: "testtestetqan@outlook.com",
        to: "etqan.testmail@gmail.com",
        subject: "Sending Email using Node.js",
        text: emailText,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log("Sending links to students:", surveyLinks);

      res.status(200).json({ message: "Links sent to students successfully!" });
    } catch (error) {
      console.error("Error sending links to students:", error);
      res.status(500).json({ message: "Error sending links to students" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
