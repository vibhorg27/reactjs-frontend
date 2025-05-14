import { useState } from 'react'


function Home() {
  const [userName , setUserName] = useState('');
  const [error, setError] = useState();

  const greeting = "Hello";
  const name = "Bridgelabz";
  const imgURL = 'https://www.bridgelabz.com/assets/images/BridgeLabz%20New%20Logo.svg'
  const altText = "Bridgelabz Logo"

  const url = "https://www.bridgelabz.com/"

  const handleChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    const isValid = /^[A-Z]/.test(value) && value.length >=3;
    setError(value ? (isValid? "": "Name should start with capitals and should be more than 3 letters") : "")
  }


  return (
    <>
    <div>
      <h1 className='hello-message'>{{userName} && !error ? `Hello ${userName} from Bridgelabz` : "Hello from BridgeLabz"}</h1>
      <div> 
        <a href={url} target='_blank'>
          <img src= {imgURL} alt={altText} />
        </a>
      </div>
      <br />
      <input className = 'input-field' type="text" 
       value={userName}
       onChange={handleChange}
       placeholder='Enter Name'
       />
      {error && <p className='error'> {error} </p>}
      
    
    </div>  
    </>
  )
}

export default Home
