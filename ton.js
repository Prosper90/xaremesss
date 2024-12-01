const express = require("express");
const axios = require("axios");
const TonWeb = require("tonweb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const tonweb = new TonWeb(
  new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC")
);

app.get("/auth/login", (req, res) => {
  const redirectUri = `https://ton.org/auth?client_id=${process.env.TON_CLIENT_ID}&redirect_uri=${process.env.TON_REDIRECT_URI}&response_type=code`;
  res.redirect(redirectUri);
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post("https://ton.org/token", {
      client_id: process.env.TON_CLIENT_ID,
      client_secret: process.env.TON_CLIENT_SECRET,
      code,
      redirect_uri: process.env.TON_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const accessToken = tokenResponse.data.access_token;

    const userInfo = await tonweb.api.getAccountInfo(accessToken);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Authentication failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
