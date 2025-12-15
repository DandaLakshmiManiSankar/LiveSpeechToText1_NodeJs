const express = require("express");
const path = require("path");

const app = express();
const PORT = 5001;

/* -------- MIDDLEWARE -------- */
app.use(express.json()); // replaces Flask request.get_json()
app.use(express.urlencoded({ extended: true }));

/* -------- VIEW ENGINE -------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* -------- IN-MEMORY STORE -------- */
const TRANSCRIPTS = {
  1: { text: "", updated_at: null }
};

/* -------- ROUTES -------- */

// Equivalent to Flask: @app.route("/")
app.get("/", (req, res) => {
  res.render("index"); // renders views/index.ejs
});

// Equivalent to Flask: @app.route("/save_transcript", methods=["POST"])
app.post("/save_transcript", (req, res) => {
  const { field, text } = req.body;

  if (parseInt(field) !== 1) {
    return res.status(400).json({
      success: false,
      message: `Invalid field number: ${field} for this app.`
    });
  }

  TRANSCRIPTS[1].text = text.trim();
  TRANSCRIPTS[1].updated_at = new Date().toISOString();

  res.json({
    success: true,
    field: 1,
    text: TRANSCRIPTS[1].text,
    updated_at: TRANSCRIPTS[1].updated_at
  });
});

// Equivalent to Flask: @app.route("/get_transcripts")
app.get("/get_transcripts", (req, res) => {
  res.json({
    success: true,
    data: TRANSCRIPTS
  });
});

/* -------- START SERVER -------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
