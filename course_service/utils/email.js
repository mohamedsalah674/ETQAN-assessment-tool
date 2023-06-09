import sgMail from "@sendgrid/mail";
import { Model } from "mongoose";
export function sendVerificationEmail(
  { to, subject, text, html },
  email,
  success,
  failure
) {
  sgMail.setApiKey(
    "G.KRGLM9b_R8SGV9-cjpsXgw.QdC2HDSaH-g1ha2W41pMSfE00-jAS1KOEvOelEAgOZw"
  );
  sgMail
    .send({
      from: "etqan.assessment.tool.2023@gmail.com",

      to: email,

      subject: subject,
      text: text,
      html: html,
    })
    .then(success)
    .catch(failure);
}
