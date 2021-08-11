const {
  Router
} = require("express");
const usersCtrl = Router();
const passport = require("passport");
const pagos = require("../models/pagos");
const users = require("../models/users");
require("../passport/local-auth")(passport);

usersCtrl.renderRegistrarse = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      title: "Bienvenidos a La-Place"
    });
  } else {
    res.render("registrarse", {
      title: "Registrate"
    });
  }
};

usersCtrl.registrarse = () => passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/registrarse",
  failureFlash: true,
});

usersCtrl.renderIngresar = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      title: "Login"
    });
  } else {
    res.render("iniciosesion", {
      title: "Accede"
    });
    // next();
  }
};

usersCtrl.ingresar = () => passport.authenticate("local-signin", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

usersCtrl.logout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};

//render to profile
usersCtrl.renderProfile = (req, res) => {
  try {
    res.render('profile', {
      user: req.user,
      title: 'Perfil'
    });
  } catch (error) {
    res.render("/", {
      error: true,
      msg: 'Datos no válidos'
    });
    console.log('error', error);
  }
};

//all edit user here
usersCtrl.renderEditar = async (req, res) => {
  try {
    const existUser = await users.findOne({
      _id: req.params.id
    });
    console.log(existUser, 'USER OK');
    res.render("editarp", {
      user: existUser,
      error: false,
      title: 'Editar'
    });
  } catch (error) {
    res.render("profile", {
      error: true,
      msg: 'Datos no válidos'
    });
    console.log('error', error);
  }
};

usersCtrl.renderM = (req, res) => {
  res.render('editarp', {
    title: 'nuevo'
  });
};

usersCtrl.renderEditarPut = async (req, res) => {
  const id = req.params.id
  const body = req.body

  try {
    const user = await users.findByIdAndUpdate(id, body, {
      useFindAndModify: false
    })
    console.log(user, 'USER PUT')
    res.json({
      estado: true,
      mensaje: 'Editado'
    })

  } catch (error) {
    console.log('error', error);

    res.json({
      estado: false,
      mensaje: 'No se completo la acción!!'
    })
  }
};

// usersCtrl.renderEditarPasswordPost = () => passport.authenticate("local-change-pass", {
//   successRedirect: "/profile",
//   failureRedirect: "/",
//   failureFlash: true,
// });

// usersCtrl.renderEditarPasswordPost = async (req, res) => {
//   const body = req.body;
//   try {
//     const user = await users.findOne({
//       email: body.email
//     });
//     console.log(user, 'USER CHANGE PASS');
//     await user.setPassword(body.password);
//     await user.save();
   
//     res.json({
//       estado: true,
//       mensaje: 'Pass changed'
//     })
//   } catch (error) {
//     console.log('error', error);
//     res.json({
//       estado: false,
//       mensaje: 'No se completo la acción!!'
//     })
//   }
// };

usersCtrl.renderRoles = (req, res) => {
  users.find({}, (error, users) => {
    res.render('asigroles', {
      users,
      title: 'Asignacion de roles',
      sesion: false,
      msg: {
        error: req.flash('error'),
        info: req.flash('info')
      },
    });
  }).sort({
    timestamp: -1
  });
};
usersCtrl.editRoles = async (req, res, next) => {

  let {
    id
  } = req.params;
  const user = await users.findById(id);
  if (user.rol == 1) {
    user.rol = 2;
  } else if (user.rol == 2) {
    user.rol = 1;
  }
  await user.save();
  res.redirect('/roles');
};
 



module.exports = usersCtrl;
//this function verify if user it's loggued
function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/');
  }
}
usersCtrl.renderPagar = (req, res) => {
  res.render("success", { title: "Editar Perfil" });
  const {estado,total,id}=req.body; 
	new Pago({ 
		id: id,
		total: total,
		estado: true,
	}).save(function (err) { 
	  if (!err) {
		console.log("Pago guardado con éxito");
		console.log(Platillo); 
		res.send(req.flash('success_msg', 'Pago guardado con éxito'));   
	  } else {
		console.log("Ha ocurrido un error ", err);
		res.send("error ");
	  }
	});
};
usersCtrl.renderVerPago = (req, res, next) => {
  if (req.isAuthenticated()) { 
    pagos.find({}, (error, pagos) => {
      res.render('verpagos', {
        pagos,
        title: "Lista de Pagos Realizados",
        sesion: false,
        msg: {
          error: req.flash('error'),
          info: req.flash('info')
        },
      });
    }).sort({
      timestamp: -1
    }); 

  } else {
    res.render("iniciosesion", {
      title: "Accede"
    });
    // next();
  }
};
module.exports = usersCtrl;
