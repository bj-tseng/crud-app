// GET ALL MESSAGES

const getMessages = (input) => {

  const messagesContainer = document.querySelector('.todo_list')
  messagesContainer.innerHTML = '';

  input.forEach(msg => {
    const newMsgContainer = document.createElement('div');
    
    const newMsg = document.createElement('span');
    newMsg.innerHTML = msg;
    
    // DELETE CAPABILITY

    const newBtn = document.createElement('button');
    newBtn.innerHTML = 'Delete';

    
    newBtn.addEventListener('click', async (e) => {
      
      e.preventDefault();
      
      let messages;
      
      await fetch(`/delete?msg=${msg}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(res => {
          messages = res.messages;
        })
        .catch(err => console.log('Error with fetch request: ', err))

      getMessages(messages);
    });


    // UPDATE CAPABILITY

    const input = document.createElement('input');
    input.placeholder = 'Insert update action item'

    const inputBtn = document.createElement('button');
    inputBtn.innerHTML = 'Update task';

    inputBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const updatedMsg = input.value;
      input.value = '';

      let messages;

      alert(msg)
      alert(updatedMsg);

      await fetch(`/update?oldmsg=${msg}&newmsg=${updatedMsg}`, {
        method: 'PUT',
      })
        .then(res => res.json())
        .then(res => {
          messages = res.messages;
        })
        .catch(err => console.log('Error with fetch request: ', err));

      messages && getMessages(messages);
    })

    newMsgContainer.appendChild(newMsg);
    newMsgContainer.appendChild(newBtn);
    newMsgContainer.appendChild(input);
    newMsgContainer.appendChild(inputBtn);
    messagesContainer.appendChild(newMsgContainer);
  })
}


// NEW USER LOGIN & PASSWORD

const newUserForm = document.querySelector('#newUser_form');

const newUser = document.getElementById('newUser');
let newUsernameInput;
newUser.addEventListener('input', (e) => {
  newUsernameInput = e.target.value;
})

const newPassword = document.getElementById('newPassword');
let newPasswordInput;
newPassword.addEventListener('input', (e) => {
  newPasswordInput = e.target.value;
})

newUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  newUser.value = '';
  newPassword.value = '';

  let user;

  await fetch(`/createUser?user=${newUsernameInput}&pass=${newPasswordInput}`)
    .then(res => res.json())
    .then(res => {
      user = res.user.username;
    })
    .catch(err => console.log('Error with fetch request: ', err))

  const toDoListName = document.querySelector('#currentUser')
  toDoListName.innerHTML = user;

  const messagesContainer = document.querySelector('.todo_list')
  messagesContainer.innerHTML = '';

});



// EXISTING USER LOGIN & PASSWORD

const existingUserForm = document.querySelector('#existingUser_form');

const oldUser = document.getElementById('oldUser');
let oldUsernameInput;
oldUser.addEventListener('input', (e) => {
  oldUsernameInput = e.target.value;
})

const oldPassword = document.getElementById('oldPassword');
let oldPasswordInput;
oldPassword.addEventListener('input', (e) => {
  oldPasswordInput = e.target.value;
})

existingUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  oldUser.value = '';
  oldPassword.value = '';

  let user;
  let messages;

  await fetch(`/loginUser?user=${oldUsernameInput}&pass=${oldPasswordInput}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      user = res.user;
      messages = res.messages;
    })
    .catch(err => console.log('Error with with fetch request: ', err))

  if (user) {
    const toDoListTitle = document.querySelector('#currentUser')
    toDoListTitle.innerHTML = user;
  }

  messages && getMessages(messages);
});


// ADD NEW TASK

const newTaskForm = document.querySelector('#new_message_form');

const newTask = document.getElementById('createTask');

let newTaskInput;
newTask.addEventListener('input', (e) => {
  newTaskInput = e.target.value;
})


newTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  newTask.value = '';
  
  let messages;

  await fetch(`/newTask?msg=${newTaskInput}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      messages = res.messages;
    })
    .catch(err => console.log('Error with fetch request: ', err))

  messages && getMessages(messages);
})

// LOGOUT FEATURE

const logoutButton = document.querySelector('#logout_btn');

logoutButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const messagesContainer = document.querySelector('.todo_list')
  messagesContainer.innerHTML = '';

  const toDoListTitle = document.querySelector('#currentUser')
  toDoListTitle.innerHTML = 'A';

  await fetch('/logout')
    .then(res => res.json())
    .then(res => alert(res))
    .catch(err => console.log('Error with fetch request: ', err));
})

