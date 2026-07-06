import "dotenv/config";

import express from "express";
import { Resend } from "resend";
import { google } from "googleapis";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("."));

const resend = new Resend(process.env.RESEND_API_KEY);


// GOOGLE AUTHENTICATION

const auth = new google.auth.GoogleAuth({

    credentials: {

        client_email: process.env.GOOGLE_CLIENT_EMAIL,

        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")

    },

    scopes: [
        "https://www.googleapis.com/auth/spreadsheets"
    ]

});


const sheets = google.sheets({

    version: "v4",

    auth

});


// FORM SUBMISSION

app.post("/submit-form", async (req, res) => {

    const { name, email, reason } = req.body;


    if (!name || !email || !reason) {

        return res.status(400).json({

            message: "All fields are required"

        });

    }


    try {


        // 1. SAVE DATA TO GOOGLE SHEETS

        await sheets.spreadsheets.values.append({

            spreadsheetId: process.env.GOOGLE_SHEET_ID,

            range: "Sheet1!A:D",

            valueInputOption: "USER_ENTERED",

            requestBody: {

                values: [

                    [

                        new Date().toLocaleString(),

                        name,

                        email,

                        reason

                    ]

                ]

            }

        });


        console.log("Data saved to Google Sheets");


        // 2. EMAIL TO OWNER

        const ownerEmail = await resend.emails.send({

            from: "Form System <onboarding@resend.dev>",

            to: process.env.OWNER_EMAIL,

            replyTo: email,

            subject: `New Form Submission from ${name}`,

            html: `

                <h2>New Form Submission</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Reason:</strong> ${reason}</p>

            `

        });


        if (ownerEmail.error) {

            console.log("Owner Email Error:", ownerEmail.error);

            return res.status(500).json({

                message: "Owner email failed"

            });

        }


        console.log("Owner email sent");


        // 3. THANK YOU EMAIL TO USER

        const userEmail = await resend.emails.send({

            from: "Form System <onboarding@resend.dev>",

            to: email,

            subject: "Thanks for filling the form!",

            html: `

                <h2>Thank You ${name}!</h2>

                <p>We received your form successfully.</p>

                <p>Your response has been recorded.</p>

            `

        });


        if (userEmail.error) {

            console.log("User Email Error:", userEmail.error);

        }

        else {

            console.log("Thank-you email sent");

        }


        return res.json({

            message: "Form Submitted Successfully!"

        });


    }

    catch (error) {

        console.log("SERVER ERROR:");

        console.log(error);

        return res.status(500).json({

            message: "Something went wrong"

        });

    }

});


// START SERVER

app.listen(PORT, () => {

    console.log(`Server Started on http://localhost:${PORT}`);

});