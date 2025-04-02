import axios from "axios";

function getBaseURL() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  }
  return process.env.NEXT_PUBLIC_SITE_URL + "/api";
}

const baseURL = getBaseURL();

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
