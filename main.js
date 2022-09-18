const express = require("express");
const db = require("./db.js");
const app = express();

const handlebars = require("express-handlebars");

const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",
});

app.engine("hbs", hbs);
app.set("view engine", "hbs");


const DB = new db("data");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

 
app.get("/altaproductos", (req, res) => {
  res.render("main", { layout: "altaproductos" });

});

app.get("/productos", async (req, res) => {
  const productos = await DB.getAllProducts();
  res.render("main", { layout: "productos", productos });
});



app.post("/api/productos", async (req, res) => {
  console.log(req.body);
  const { nombre, precio, urlimagen } = req.body;
  const data = await DB.createProduct({ nombre, precio, urlimagen });
  return res.redirect("/altaproductos");
});


app.listen(8080, () => {
  console.log("Iniciado");
});



