const Utilidades = {};

Utilidades.getNombreImagen = (res) => {
  console.log("*-*-*-*--*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**");
  //   console.log(res.locals.error_msg);
  console.log(res.locals.imagen);
  console.log("*-*-*-*--*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**");
  if (res.locals.imagen.length != 0) {
    return imagen[0];
  } else {
    return "";
  }
};
Utilidades.imagen = (res) => {
  if (
    typeof res.locals.imagen == undefined ||
    typeof res.locals.imagen == null
  ) {
    return "../uploads/" + res.locals.imagen;
  } else {
    console.log("*-*-*-*--*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**");
    //   console.log(res.locals.error_msg);
    console.log(res.locals.imagen);
    console.log("*-*-*-*--*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**");
    // return "../uploads/" + Utilidades.getNombreImagen(res);
    return "../assets/img/face.jpg";
  }
  //('../uploads/'+imagenCap)
};

module.exports = Utilidades;
