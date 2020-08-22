const db = require('./model.js')

const userController = {};

userController.createUser = async (req, res, next) => {
  const user = req.query.user;
  const password = req.query.pass;

  const queryMsg = `
    INSERT INTO users (username, password)
    VALUES ('${user}', '${password}')
    RETURNING *;
    `

  try {
    const userInfo = await db.query(queryMsg);
    res.locals.user = userInfo.rows[0];
    return next();
  } catch(err) {
    console.log('Error with creating new user in database: ', err);
    return next('Error with database');
  }
}

userController.loginUser = async (req, res, next) => {
  
  let user;
  let password;

  if (req.query.user) {
    user = req.query.user;
  } else {
    user = req.cookies.username;
  }

  if (req.query.pass) {
    password = req.query.pass;
  } else {
    password = req.cookies.password;
  }

  const queryMsg = `
    SELECT * FROM users
    WHERE username = '${user}';
    `
  
  try {
    const userInfo = await db.query(queryMsg);
    if (!userInfo.rows.length) {
      return next('No such user exists.')
    } else if (userInfo.rows[0].password !== password) {
      return next('Incorrect password supplied.')
    }
    res.locals.user = userInfo.rows[0];
    return next()
  } catch(err) {
    console.log('Error with retrieving user record from database: ', err);
    return next('Error with database');
  }
}

userController.cookie = (req, res, next) => {
  res.cookie('username', req.query.user);
  res.cookie('password', req.query.pass);
  return next();
}

userController.logout = (req, res, next) => {
  res.clearCookie('username');
  res.clearCookie('password');
  return next();
}

module.exports = userController;
