
//Log In Log Out functions
const showLoggedIn = () => {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#createbusiness-link').classList.remove('hidden')
  document.querySelector('#logout-link').classList.remove('hidden')
  
}

const showLoggedOut = () => {
  document.querySelector('#createbusiness-link').classList.add('hidden')
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
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#home-content').classList.remove('hidden')
} catch (error) {
    console.log(error)
    alert('login failed')
}
})



//business content
let i
let iNum = []
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
      iNum.push(i)
      business.classList.add (`business${i}`)
       business.innerText = response.data.business[i].name
       allbusiness.append(business)
      console.log(response.data.business[i])
    }

    console.log (iNum)

     //// view a single business
     for (let j = 0; j < iNum.length; j ++){
       document.querySelector(`.business${iNum[j]}`).addEventListener('click', async (event) => {
        const userId = localStorage.getItem('userId')
        
        document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
        document.querySelector('#singlebusiness').classList.remove('hidden')
        document.querySelector('#reviews').classList.remove('hidden')
        
        
        let response = await axios.get(`http://localhost:3001/businesses/${j+1}`)

        // console.log(response)
         let businessOwnerName = document.querySelector('.businessOwnerName')
         let businessName = document.querySelector('.businessName')
         let businessAddress = document.querySelector('.businessAddress')
         let businessType = document.querySelector('.businessType')
         let businessDescription = document.querySelector('.businessDescription')
        
         businessOwnerName.innerText  = `Business Created By: ${response.data.user.name}`
         businessName.innerText = response.data.business.name
         businessAddress.innerText = response.data.business.address
         businessType.innerText = response.data.business.businessType
         businessDescription.innerText = response.data.business.description
   
       console.log('you clicked on business')
       console.log(response.data.user.name)
      
       let businessId = response.data.business.id
       console.log(businessId)
       createReview(businessId)
       showReviews(businessId)
      })

     }
    // console.log (i)
    
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


//reviews
const createReview=(businessId)=> document.querySelector('#reviews').addEventListener('submit', async (event) => {
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
    const response = await axios.post(`http://localhost:3001/reviews/${businessId}`, {
      headline: headline,
      content: content,  
      rating: rating,
      businessId: `${businessId}`,
      userId: userId
  })
  console.log(response)
  let reviewData = response.data
  showReviews(businessId)

} catch (error) {
    console.log(error)
    alert('Login to leave a comment!')
}
})

//Show reviews
const showReviews = async (businessId) => {
  try {
    const response = await axios.get(`http://localhost:3001/businesses/${businessId}/reviews`)
    // console.log(response)

    let showReview = document.querySelector('.showReview')
    let reviewDetail = response.data.reviews
    console.log(reviewDetail)
    while(showReview.firstChild) {
      showReview.firstChild.remove()
}



    for (let i = 0; i < reviewDetail.length ; i++) {
      let newDiv = document.createElement('div')
      console.log(reviewDetail[i])
      newDiv.classList.add('newDiv')
      let h4 = document.createElement('h4')
      
      h4.innerText = `Name: ${reviewDetail[i].user.name}, Headline:${reviewDetail[i].headline}, Content:${reviewDetail[i].content}, Rating:${reviewDetail[i].rating} `
      newDiv.append(h4)
      showReview.append(newDiv)
      } 

  } catch (error) {
    console.log('cat not get reviews')
  }
}


//logout
document.querySelector('#logout-link').addEventListener('click', async (event) => {
  event.preventDefault()
  localStorage.removeItem('userId')
  location.reload();
  showLoggedOut()
})


//When Home is clicked, page refreshes
document.querySelector('#home-link').addEventListener('click', () => {
  location.reload();
})

