require("dotenv").config();

const stripe = require("stripe")(
  "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"
);
const express = require("express");
const router = require("vite-express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static("public"));

const db = require("./db/client");
db.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const apiRouter = require("./api");
app.use("/api", apiRouter);

const YOUR_DOMAIN = "https://lizardsplushies.onrender.com";

app.post("/create-checkout-session", async (req, res) => {
  const { line_items } = req.body;
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ url: session.url });
});

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);

router.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = router;
