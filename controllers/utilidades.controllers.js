const Utilidades = {};
/**
 * 
 * @param {el req del sistema} req 
 * @returns la imagen para el sistema
 */
Utilidades.obtenerImagen = (req) => {
  if (
    typeof req.session.imagen == undefined ||
    typeof req.session.imagen == null ||
    req.session.imagen === ''
  ){
    return "../assets/img/face.jpg";
  }else{
    return '../uploads/'+req.session.imagen;
  }
}
/**
 * 
 * @param {el req del sistema} req 
 * @returns devuelve un objeto con true si existe un mensaje satisfactorio
 */
Utilidades.obtenerMensajeSuccess = (req)=>{
  
  if (
    typeof req.session.success_msg === undefined ||
    req.session.success_msg == ''
  ){
    console.log("............. VALIDO A VERDADERO ...................");
  console.log(req.session.success_msg);
  console.log("...................................................");
    return {existe: false,mensaje: "Esto no se debe presentar"};
  }else{
    console.log("............. VALIDO A FALSO ...................");
  console.log(req.session.success_msg);
  console.log("...................................................");
    return {existe: true,mensaje: req.session.success_msg};
  }
}

module.exports = Utilidades;
