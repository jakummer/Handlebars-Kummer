const express = require("express");
const db = require("./db.js");
const app = express();
//const bcrypt = require("bcrypt");

const handlebars = require("express-handlebars");

//views
//app.use('views', './views/')

//view engine

const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",
});

app.engine("hbs", hbs);
app.set("view engine", "hbs");

//app.set("view engine", "pug");

const DB = new db("data");
// middleware https://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware https://expressjs.com/es/api.html#express.json
app.use(express.json());

 
app.get("/altaproductos", (req, res) => {
  res.render("main", { layout: "altaproductos" });
  //res.render("formulario");
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




// app.get("/usuario/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await DB.getUserById(id);
//     // const {nombre, correo} =  data;
//     res.render("main", { layout: "usuario", ...data });
//   } catch (e) {
//     return res.status(404).render("main", { layout: "error" });
//   }

//   res.render("main", { layout: "usuarios", usuarios });
// });


//middleware hash contrasena

//* request/ response

// root = no hay problema
// app.get("/api/", (req, res) => {
//   res.send({ error: false });
// });

// //getAll
// app.get("/api/usuarios", async (req, res) => {
//   const data = await DB.getAllUsers();
//   return res.send(data);
// });

//getById
// queries
// * GET ?id=10

// app.get("/api/usuario", async (req, res) => {
//   const { id } = req.query;
//   try {
//     const data = await DB.getUserById(id);

//     return res.send(data);
//   } catch (e) {
//     return res.status(404).send({ error: true, msg: e.message });
//   }
// });



