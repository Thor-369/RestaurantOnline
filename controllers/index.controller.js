/**
 * renderiza el index de la pagina
 * @param {el req del sistema} req el req del sistema
 * @param {el res del sistema} res el res del sistema
 */
export const renderIndex = (req, res) => {
    res.render("index");
  };
  /**
 * renderiza la vista about del sistema
 * @param {el req del sistema} req el req del sistema
 * @param {el res del sistema} res el res del sistema
 */
  export const renderAbout = (req, res) => {
    res.render("about");
  };