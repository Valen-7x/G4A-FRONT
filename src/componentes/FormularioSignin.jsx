import { useRef, useEffect } from 'react'
import { api, apiUrl, endpoints } from '../../utils/api'
import { Link as Anchor , useNavigate } from 'react-router-dom'
import Swal from 'sweetalert';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import Sidebar from "./Sidebar";

export default function FormularioSignin() {
    let navigate = useNavigate()
    let inputEmail = useRef("")
    let inputPassword = useRef("")
    const clientID = "68255434988-6cdn05n1354e2h4uibrt26heh9ifeg77.apps.googleusercontent.com"

  const signin = async (event) => {
    event.preventDefault()
    let data = {
      email: inputEmail.current.value,
      password: inputPassword.current.value
    }

    try {
      let response = await api.post(apiUrl + endpoints.signin, data)
      console.log(response)
      if (response.data.success) {
        Swal({
          title: 'Successful signed in',
          text: 'User signed in!',
          icon: 'success',
          button: 'OK',
        })
        localStorage.setItem('token', response.data.response.token)
        localStorage.setItem('user', JSON.stringify(response.data.response.user))
        localStorage.setItem('photo', response.data.response.photo)
        navigate('/')
      } else {
        alert('Authentication failed!')
      }
    } catch (error) {
      Swal({
        title: 'Failed igned in',
        text: 'Signed in failed. Please try again.',
        icon: 'error',
        button: 'OK',
      });
    }
  }

  const onSuccess = async (response) => {
    try {
      const loginData = {
        email: response.profileObj.email,
        password: response.profileObj.googleId,
      };
  
      // Envía la solicitud de inicio de sesión a tu API
      const responseFromAPI = await api.post(apiUrl + endpoints.signin, loginData);
  
      if (responseFromAPI.data.success) {
        Swal({
          title: 'Successful signed in',
          text: 'User signed in!',
          icon: 'success',
          button: 'OK',
        })
        localStorage.setItem('token', responseFromAPI.data.response.token);
        // localStorage.setItem('token', responseFromAPI.data.response.token);
        localStorage.setItem('email', response.profileObj.email);
        localStorage.setItem('photo', response.profileObj.imageUrl);
        console.log(responseFromAPI);
        navigate('/');
      } else {
        alert('Authentication failed!');
      }
    } catch (error) {
      Swal({
        title: 'Failed igned in',
        text: 'Signed in failed. Please try again.',
        icon: 'error',
        button: 'OK',
      });
    }
  };
  const onFailure = () => {
    console.log("Something went wrong");
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });
  
  return (
    <div className='flex flex-wrap flex-col justify-center items-center w-screen h-screen ' >
      <Sidebar />
      <div className='flex flex-row justify-center items-center bg-[#080C13] rounded-lg py-4 px-12 w-3/5'>
      <div className="flex flex-col w-full items-center justify-center">
      <h2 className='my-4  text-center text-[30px] flex-wrap font-bold text-[#EBEBEC]'>SIGN IN <span className='text-amber-300'>GAMER!</span></h2>
      <p className='text-center text-[15px] flex-wrap font-bold text-[#EBEBEC] tracking-[0.8px]'>Unlimited fun awaits you...</p>
      <img className='my-8 rounded-lg' src="/public/Captura de pantalla (101).png" alt="" />
      </div>
        <div>
        {/* <h2 className='text-center text-[30px] flex-wrap font-bold text-[#FAFCFC]'>SIGN IN <span className='text-amber-300'>GAMER!</span></h2>
      <p className='text-center text-[15px] flex-wrap font-bold text-[#FAFCFC]'>Unlimited fun awaits you...</p> */}
      <form onSubmit={signin} className="w-full">
        <div className="w-full mt-4 mr-0 mb-0 ml-0 space-y-6 flex flex-col items-center">
          <div>
            <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic leading-[normal] tracking-[0.6px] font-bold text-amber-300">Email</p>
            <input ref={inputEmail} placeholder="Example@gmail.com" id="email" name="email" type="email" required className="border placeholder-gray-300 pt-4 pr-4 pb-2 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-zinc-800 hover:bg-zinc-700
                     text-[#EBEBEC] rounded-[5px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0" />
          </div>
          <div>
            <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic leading-[normal] tracking-[0.6px] font-bold text-amber-300">Password</p>
            <input ref={inputPassword} placeholder="Password" id="password" name="password" type="password" required className="border placeholder-gray-300 pt-4 pr-4 pb-2 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-zinc-800 hover:bg-zinc-700
                     text-[#EBEBEC] rounded-[5px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0" />
          </div>
          <button type="submit" className="flex w-[70vw] md:w-[30vw] h-12 flex-col items-center justify-center shrink-0 rounded-[5px] hover:bg-zinc-950 border border-solid border-amber-300 bg-gradient-to-r from-amber-400 to-amber-700 transition-colors duration-500 hover:from-amber-400 hover:to-amber-600">
            <a className="text-[#EBEBEC] text-center text-sm not-italic font-bold leading-[normal] tracking-[0.7px]">Sign In </a>
          </button>
          <GoogleLogin
              clientId={clientID}
              render={renderProps => (
                <button className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[5px] hover:bg-zinc-950 border-solid border-white  flex justify-center items-center" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <img src="/public/Google.png" className="w-6 h-6 shrink-0" />
                <p className="ms-2 text-[#EBEBEC] text-center text-sm not-italic font-medium leading-[normal] tracking-[0.7px]">Sign in with Google</p></button>
              )}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />
          <p className="text-[#EBEBEC] text-sm not-italic font-medium leading-[normal] tracking-[0.7px]">You dont have an account yet? <Anchor className="text-amber-400 hover:text-amber-300">Sign up</Anchor></p>
          <p className="text-[#EBEBEC] text-sm not-italic font-medium leading-[normal] tracking-[0.7px]">Go back to <Anchor to={"/"} className="text-amber-400 hover:text-amber-300">home page</Anchor></p>
        </div>
      </form>
      </div>
      </div>

    </div>
  )
}
