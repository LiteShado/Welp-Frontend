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
  document.querySelector('#profile-content').classList.remove('hidden')
})


//logged-in state
// if(localStorage.getItem('userId')){
//   loggedIn()
//   showDashBoard()
// }else{
//   loggedOut()
// }




//signup
// document.querySelector('#signup-link').addEventListener('click', () => {
  // showSection('.signup-board')
document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault()
  // const name = document.querySelector('#name').value -needs to be added to main.js and HTML
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
      
        
      alert('Successfully signed up!')
  } catch (error) {
      // console.log(error)
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
  // console.log(userId)

  // document.querySelector('.signup-form').classList.add('hidden')
  // document.querySelector('.login-form').classList.add('hidden')
  // document.querySelector('.dashboardScreen').classList.remove('hidden')
  // document.querySelector('.login-screen').innerText = `Welcome back ${response.data.user.name}! you are successfully logged in`

  alert(`Welcome back ${response.data.user.name}! you are successfully logged in`)
} catch (error) {
    console.log(error)
    alert('login failed')
}
})
