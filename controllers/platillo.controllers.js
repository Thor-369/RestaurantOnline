const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const platilloCtrl = Router();
platilloCtrl.renderPlatillos = async (req, res) => {
  const platillos = await Platillo.find().lean();
  // res.send(platillos);
  // res.render("tablaplatillos", {title: "Platillos"});
  res.render("tablaplatillos", {title: "Platillos",platillos: platillos});
};

platilloCtrl.renderAdministrar = async (req, res) => {
  res.render("administrarplatillo", { title: "Administrar" });
};

platilloCtrl.administrar = (req, res) => {
  new platillo({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    url: "/uploads/" + req.body.image,
    calificacion: 5,
  }).save(function (err) {
    if (!err) {
      console.log("Platillo agregado con éxito");
      console.log(platillo);
      res.send("Platillo agregado");
    } else {
      console.log("Ha ocurrido un error", err);
      res.send("error");
    }
  });
};

module.exports = platilloCtrl;
