

//Log In Log Out functions
const showLoggedIn = () => {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
}

const showLoggedOut = () => {
  document.querySelector('#createbusiness-link').classList.add('hidden')
  document.querySelector('#reviews-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#deletebusiness-link').classList.add('hidden')
}

//Checks for user
if (localStorage.getItem('userId')) {
  showLoggedIn()
} else {
  showLoggedOut()
  localStorage.clear()
}

// nav links
document.querySelector('#home-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#home-content').classList.remove('hidden')
})

document.querySelector('#signup-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#signup-content').classList.remove('hidden')
})

document.querySelector('#login-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#login-content').classList.remove('hidden')
})

document.querySelector('#logout-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#logout-content').classList.remove('hidden')
})

document.querySelector('#business-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#allbusiness').classList.remove('hidden')
})

document.querySelector('#createbusiness-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#createbusiness').classList.remove('hidden')
})

document.querySelector('#reviews-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#reviews').classList.remove('hidden')
})

document.querySelector('#deletebusiness-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#deletebusiness-content').classList.remove('hidden')
})




//signup

document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const name = document.querySelector('#signup-name').value
  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value

  try {
      const response = await axios.post('http://localhost:3001/users', {
          name: name,
          email: email,
          password: password
      })
      // console.log(response)
      document.querySelector('#logout-link').classList.add('hidden')
      document.querySelector('#createbusiness-link').classList.add('hidden')
      document.querySelector('#reviews-link').classList.add('hidden')

      alert('Successfully signed up!')
  } catch (error) {
          alert('email is already used by someone')
  }

})

//login

document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault()
const email = document.querySelector('#login-email').value
const password = document.querySelector('#login-password').value

try {
    const response = await axios.post('http://localhost:3001/users/login', {
    email: email,
    password: password
  })
  // console.log(response)

  const userId = response.data.user.id
  localStorage.setItem('userId', userId)
  alert(`Welcome back ${response.data.user.name}! you are successfully logged in`)
  showLoggedIn()
} catch (error) {
    console.log(error)
    alert('login failed')
}
})

//home content

document.querySelector('#home-link').addEventListener('click', async (event) => {
  event.preventDefault()
  alert(`W E L P!!`)

  const userId = response.data.user.id
  localStorage.getItem('userId', userId)
})

//business content

document.querySelector('#allbusiness').addEventListener('click', async (event) => {
  event.preventDefault()

})

//create business
document.querySelector('#businessInfoForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const userId = response.data.user.id
  localStorage.getItem('userId', userId)

  const response = await axios.post('http://localhost:3001/business/:userId', {
    businessname: businessname,
    address: address,
    type: type
})
})

//reviews
document.querySelector('#reviews').addEventListener('submit', async (event) => {
  event.preventDefault()

  const userId = response.data.user.id
  localStorage.getItem('userId', userId)
})


//logout
document.querySelector('#logout').addEventListener('submit', async (event) => {
  event.preventDefault()
  const userId = response.data.user.id
  localStorage.clearItem('userId', userId)
  showLoggedOut()

})
//delete
document.querySelector('#delete').addEventListener('submit', async (event) => {
  event.preventDefault()
  const userId = response.data.user.id
  localStorage.clearItem('userId', userId)
  showLoggedOut()
})
