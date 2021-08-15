const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const { NotExtended } = require("http-errors");
// const { log } = require("debug");
// const flash = require('connect-flash');
const platilloCtrl = Router();
const {obtenerImagen,obtenerMensajeSuccess} = require("./utilidades.controllers");

/**
  * Función listar platillos
  */ 
platilloCtrl.cargarDatosPlatillo = async (req, res) => {
  const platillos = await Platillo.find().lean();
  const { id, nombre, precio, descripcion } = req.body;
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,  
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    buscar: "",
    id
  });
};

/**
  * Función buscar platillo
  */ 
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

/**
  * renderizado administrar platillo 
  */ 
platilloCtrl.renderAdministrar = async (req, res) => {
  const platillos = await Platillo.find().lean();

  console.log("------------------------------------------------------");
  console.log(res.locals.sucess_msg);
  console.log(res.locals.error_msg);
  console.log("------------------------------------------------------");

  console.log("/*/*/*/*//**/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/");
  console.log(res.locals.sucess_msg);
  console.log("/*/*/*/*//**/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/");
  // console.log("render adminnistrar =============",req.session.imagen,"la imagen es indefinida?:",(req.session.imagen===undefined));
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: "",
    precio: "",
    descripcion: "",
    buscar: "",
    imagenCap: obtenerImagen(req),
    error_msg: res.locals.error_msg,
    success_msg: obtenerMensajeSuccess(req),
  });
};
/**
 * 
 * @param {el req del sistema} req el req del sistema
 * @param {el res del sistema} res el res del sistema 
 */
platilloCtrl.administrar = async (req, res) => {

  const {nombre,descripcion,precio}=req.body;
  const existeNombre = await Platillo.findOne({nombre});
  if (existeNombre) {
    // console.log("ya existe un platillo con el mismo nombre");

    // res.locals.error_msg="ya existe un platillo con el mismo nombre nombre con la variable local";

    req.flash("error_msg","Ya existe un platillo con el mismo nombre");
    // res.locals.imagen = null;
    req.session.imagen = '';
    req.session.success_msg = "";
    res.redirect("/administrar");
    // destruyendo session
    // req.session.imagen = null;
  } else {
    new Platillo({
    
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      url: "/uploads/" + req.session.imagen,
      calificacion: 5,
      estado: true,
    }).save(function (err) {
      // destruyendo session
      // res.locals.imagen = null;
      req.session.imagen = '';

      if (!err) {
        req.session.success_msg = "El platillo ha sido agregado exitosamente";
        console.log("Platillo agregado con éxito");
        req.flash("sucess_msg","El platillo ha sido agragado exitosamente");
        console.log(Platillo);
        // res.send("Platillo agregado ");
        res.redirect("/administrar");
      } else {
        req.session.success_msg = "";
        console.log("Ha ocurrido un error ", err);
        req.flash("error_msg","Ha ocurrido un error, contactaté con tu servicio técnico");
        res.redirect("/administrar");
      }
    });
  }
};



module.exports = platilloCtrl;
