import {google} from "googleapis";
// const GOOGLE_CLIENT_ID = ;
// const GOOGLE_CLIENT_SECRET = ;
import dotenv from "dotenv";
dotenv.config();  // ensure env is loaded
console.log(process.env.GOOGLE_CLIENT_ID)
export const oauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" // work as redirect url as it is manage by Google SDK
);