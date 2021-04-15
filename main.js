//Log In Log Out functions
const showLoggedIn = () => {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
}

const showLoggedOut = () => {
  document.querySelector('#createbusiness-link').classList.add('hidden')
  document.querySelector('#reviews-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.add('hidden')
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
  document.querySelector('#home-content').classList.remove('hidden')
})

document.querySelector('#business-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#allBusiness').classList.remove('hidden')
})

document.querySelector('#createbusiness-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#createbusiness').classList.remove('hidden')
})

document.querySelector('#reviews-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#reviews').classList.remove('hidden')
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

document.querySelector('#business-link').addEventListener('click', async (event) => {
  event.preventDefault()
})

//create business
document.querySelector('#businessInfoForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  let name = document.querySelector('#createName').value
  let address = document.querySelector('#createAddress').value
  let description = document.querySelector('#createDescription').value
  let typeid = document.querySelector('#selectedType').value
  let typeText = document.querySelector(`.option${typeid}`).innerText

  console.log(name)
  console.log(address)
  console.log(description)
  console.log(typeid)
  console.log(typeText)

  try {
     const response = await axios.post(`http://localhost:3001/businesses/${1}/${typeid}`,{
      name: name,
      address: address,
      businessType: typeText, 
      description: description,
      typeId: typeid,
      userId: userId
  })
  } catch (error) {
    res.json(error)
  }
})

//reviews
document.querySelector('#reviews-link').addEventListener('click', async (event) => {
  event.preventDefault()

  const userId = response.data.user.id
  localStorage.getItem('userId', userId)
})

document.querySelector('#logout-link').addEventListener('click', async (event) => {
  event.preventDefault()
  const userId = response.data.user.id
  localStorage.clearItem('userId', userId)
  showLoggedOut()

  
})
