const db = require('./model.js')

const recordController = {};

recordController.create = async (req, res, next) => {
  const queryMsgOne = `
  INSERT INTO actions (commentary, user_id)
  VALUES ('${req.query.msg}', '${res.locals.user.id}')
  RETURNING *;
  `
  try {
    const result = await db.query(queryMsgOne);
    console.log('NEW MESSAGE: ', result);
    return next();
  } catch(err) {
    console.log('Error occurred with inserting new task into database: ', err)
    return next('Error with database');
  }

}

recordController.read = async (req, res, next) => {
  const queryMsg = `
    SELECT * FROM actions
    WHERE user_id = ${res.locals.user.id};
    `
  try {
    const messages = await db.query(queryMsg);
    res.locals.messages = messages;
    return next();
  } catch(err) {
    console.log('Error with requesting messages from database: ', err);
    return next('Error with database');
  }
}

recordController.update = async (req, res, next) => {
  
  console.log('PAY ATTENTION: ', req.query.newmsg);
  console.log('PAY ATTENTION: ', req.query.oldmsg);
  
  const queryMsg = `
    UPDATE actions
    SET commentary = '${req.query.newmsg}'
    WHERE commentary = '${req.query.oldmsg}'
    `
  try {
    const result = await db.query(queryMsg);
    console.log('THIS IS THE RESULT: ', result);
    return next();
  } catch(err) {
    console.log('Error with updating message in database: ', err)
    return next('Error with database')  
  }

}

recordController.delete = async (req, res, next) => {

  const queryMsg = `
  DELETE FROM actions
  WHERE commentary = '${req.query.msg}'
  RETURNING *;
  `

  try {
    const result = await db.query(queryMsg);
    console.log('RESULT FROM MSG DELETE: ', result);
    return next();
  } catch(err) {
    console.log('Error with deleting message from database: ', err)
    return next(err);
  }


}



module.exports = recordController;
