const express = require('express');

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const userController = require('./userController.js');
const recordController = require('./recordController.js');

// BODY PARSERS
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// SERVE UP STATIC FILES
app.use(express.static('client'));


// SERVING UP THE INITIAL FILES
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/index.html'));
})

// CREATING A NEW ACCOUNT
app.get('/createUser',
  userController.createUser,
  userController.cookie,
  (req, res) => {
    const responseObj = {
      user: res.locals.user,
    }
    res.status(200).json(responseObj);
  })

// LOGGING IN
app.get('/loginUser',
  userController.loginUser,
  userController.cookie,
  recordController.read,
  (req, res) => {
    const messagesContainer = [];
    res.locals.messages.rows.forEach(obj => {
      messagesContainer.push(obj.commentary);
    })
    const responseObj = {
      user: res.locals.user.username,
      messages: messagesContainer,
    }
    res.status(200).json(responseObj);
  })

// CREATE NEW TASK

app.get('/newTask',
  userController.loginUser,
  recordController.create,
  recordController.read,
  (req, res) => {
    const messagesContainer = [];
    res.locals.messages.rows.forEach(obj => {
      messagesContainer.push(obj.commentary);
    })
    const responseObj = {
      messages: messagesContainer,
    }
    res.status(200).json(responseObj);
  })

// UPDATE TASK

app.put('/update',
  userController.loginUser,
  recordController.update,
  recordController.read,
  (req, res) => {
    const messagesContainer = [];
    res.locals.messages.rows.forEach(obj => {
      messagesContainer.push(obj.commentary);
    })
    const responseObj = {
      messages: messagesContainer,
    }
    res.status(200).json(responseObj);
  });

// DELETE TASK

app.delete('/delete',
  userController.loginUser,
  recordController.delete,
  recordController.read,
  (req, res) => {
    const messagesContainer = [];
    res.locals.messages.rows.forEach(obj => {
      messagesContainer.push(obj.commentary);
    })
    const responseObj = {
      messages: messagesContainer,
    }
    res.status(200).json(responseObj);
  })

// LOGOUT FEATURE

app.get('/logout',
  userController.logout,
  (req, res) => {
    res.status(200).json('You are logged out, my friend.')
  })

// FOR BAD URLS
app.use('*', (req, res) => {
  res.status(400).send('URL path not found.  Please try again.')
})


// GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(400).json(err)
})


// SPINNING UP THE SERVER
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
