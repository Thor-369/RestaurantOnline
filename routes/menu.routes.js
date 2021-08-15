const { Router } = require("express");
const router = Router();

const {renderMenu,renderCarrito, renderpago, renderpagar} = require('../controllers/menu.controllers');
/**
 * redirecciona al menu
 */
router.get("/menu", renderMenu);
/**
 * redirecciona al carrito
 */
router.get("/carrito", renderCarrito);
/**
 * redirecciona al success
 */
router.get("/success", renderpagar);
/**
 * redirecciona a la tarjeta
 */
router.get("/tarjeta", renderpago);
module.exports = router;