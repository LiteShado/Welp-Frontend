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
      showLoggedOut()

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
let i
document.querySelector('#business-link').addEventListener('click', async (event) => {
  let response 
  try {
    response = await axios.get(`http://localhost:3001/businesses/`)
    let allbusiness = document.querySelector('#allBusiness')
    while(allbusiness.firstChild){
      allbusiness.firstChild.remove()
    }
    for ( i =0; i <response.data.business.length; i++){
      let business = document.createElement("p");
      business.classList.add (`busines${i}`)
       business.innerText = response.data.business[i].name
       allbusiness.append(business)
      console.log(response.data.business[i].name)
  
      // console.log(response.data.business[i].id) need to grab it 
      // createReview(response.data)
    }
    
  } catch (error) {
    console.log (error)
  }
  
})

//create business
document.querySelector('#businessInfoForm').addEventListener('submit', async (event) => {
  event.preventDefault()
  const userId = localStorage.getItem('userId')

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
  console.log(userId)

  try {
     const response = await axios.post(`http://localhost:3001/businesses/${userId}/${typeid}`,{
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


 //// view a single business 



//reviews
const createReview=(data)=> { document.querySelector('#reviews').addEventListener('submit', async (event) => {
  event.preventDefault()
  let userId = localStorage.getItem('userId')

  const headline = document.querySelector('#reviewHeadline').value
  const content = document.querySelector('#reviewContent').value
  const rating = document.querySelector('#rating').value
 
  // console.log(userId)
  // console.log(headline)
  // console.log(content)
  // console.log(rating)

try {
    const response = await axios.post(`http://localhost:3001/reviews/${data.business[i].id}`, {
      headline: headline,
      content: content,  
      rating: rating,
      businessId: `${data.business[i].id}`,
      userId: userId
  })
  // console.log(response)

} catch (error) {
    console.log(error)
    alert('comment added!')
}
})
}

//logout
document.querySelector('#logout').addEventListener('submit', async (event) => {
  event.preventDefault()
  localStorage.removeItem('userId')
  location.reload();
  showLoggedOut()
})

//delete
document.querySelector('#delete').addEventListener('submit', async (event) => {
  event.preventDefault()
  const userId = response.data.user.id
  localStorage.clearItem('userId', userId)
  showLoggedOut()

  
})


