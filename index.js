import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var count = 0;
const blogs = [];

// Set view engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  res.render("new");
});

app.get("/view", (req, res) => {
  res.render("view", { blogs });
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    // Store the blog post in the in-memory array
    blogs.push({ title, content });
    // Redirect to the page that displays all posts
    res.redirect("/view");
  } else {
    // Handle the case where title or content is missing
    res.redirect("/create");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
