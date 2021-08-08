const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const { NotExtended } = require("http-errors");
const platilloCtrl = Router();

platilloCtrl.cargarDatosPlatillo = async (req, res) => {
  const platillos = await Platillo.find().lean();
  const { id, nombre, precio, descripcion } = req.body;
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,    
    id:id,
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    buscar: "",
    id
  });
};

platilloCtrl.buscarPlatillo = async (req, res) => {
  const { buscar } = req.body;
  // String cadena = ;
  let cadena = buscar.substring(1, buscar.length);
  // let cadena = buscar+"";
  // let subcadena = "/.*"+cadena+".*/i";

  const platillos = await Platillo.find({nombre: cadena}).lean();
  // console.log(buscar);
  // console.log("Guata");
  // res.send(`hola buscar(${buscar}), cadena(${cadena}), subcadena(${subcadena}), platillos(${platillos}))`);
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    
    nombre: "",
    precio: "",
    descripcion: "",
    buscar,
  });
};

platilloCtrl.renderAdministrar = async (req, res) => {
  const platillos = await Platillo.find().lean();
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: "",
    precio: "",
    descripcion: "",
    buscar: "",
  });
};

platilloCtrl.administrar = async(req, res) => {
  
  if(req.body.id == ""){
    new Platillo({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      url: "/uploads/"+ req.body.nombre+".jpg",
      calificacion: 5,
      estado: true,
    }).save(function (err) {
      if (!err) {
        console.log("Platillo agregado con éxito");
        console.log(Platillo);
        res.send("Platillo agregado");
      } else {
        console.log("Ha ocurrido un error", err);
        res.send("error");
      }
    });    
  }else{
    const {id,nombre,precio,descripcion} = req.body;
    alert(nombre + "Es el nombre ");
    await Platillo.findByIdAndUpdate(req.body.id,{nombre,precio,descripcion});
    alert("Se actualizo el platillo seleccionado");
    res.send("Actualizado");
  }
  
};



module.exports = platilloCtrl;
