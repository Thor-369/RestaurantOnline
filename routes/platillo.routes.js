var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();

const {cargarDatosPlatillo,renderAdministrar,administrar, buscarPlatillo} =require('../controllers/platillo.controllers');
/**
 * redirecciona a administrar platillo
 */
router.get("/administrar", renderAdministrar);
/**
 * Metodo de carga de platillos
 */
router.put("/administrar", cargarDatosPlatillo);
/**
 * metodo para las busquedas de platillos
 */
router.delete("/administrar", buscarPlatillo);

//Ingreso de platillos por administrador
router.post("/administrar", administrar);

// router.post("/administrar?_method=PUT", administrar);
/**
 * Metodo de actualizacion del platillo
 */
router.post("/actualizarPlatillo",async (req, res) => {
    alert("Es el nombre ");
    const {id,nombre,precio,descripcion} = req.body;
    alert(nombre + "Es el nombre ");
    await Platillo.findByIdAndUpdate(id,{nombre,precio,descripcion});
    alert("Se actualizo el platillo seleccionado");
    
});
 
module.exports = router;
