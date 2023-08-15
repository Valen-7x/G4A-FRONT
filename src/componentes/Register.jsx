import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import Sidebar from "./Sidebar";

export default function Register() {
  let navigate = useNavigate()
  const inputemail = useRef('');
  const inputpassword = useRef('');
  const inputphoto = useRef('');
  const clientID = "68255434988-6cdn05n1354e2h4uibrt26heh9ifeg77.apps.googleusercontent.com"

  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    inputemail.current = e.target.value;
    setEmail(e.target.value);
  };

  const handlePhotoChange = (e) => {
    inputphoto.current = e.target.value;
    setPhoto(e.target.value);
  };

  const handlePasswordChange = (e) => {
    inputpassword.current = e.target.value;
    setPassword(e.target.value);
  };

  const handleRegisterClick = async () => {
    try {
      const data = {
        email: inputemail.current,
        photo: inputphoto.current,
        password: inputpassword.current,
      };

      localStorage.setItem('email', inputemail.current);
      localStorage.setItem('password', inputpassword.current);
      localStorage.setItem('photo', inputphoto.current);

      const response = await axios.post('http://localhost:8080/api/auth/register', data);

      setEmail('');
      setPhoto('');
      setPassword('');
      Swal({
        title: 'Successful registration',
        text: 'Registration completed successfully!',
        icon: 'success',
        button: 'OK',
      })
      console.log('Successful registration:', response.data);
    } catch (error) {
      console.error('Sign up failed:', error);
      Swal({
        title: 'Failed registration',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        button: 'OK',
      });
    }
  };
  
  const onSuccess = async (response) => {
    try {
      const dataGoogle = {
        email: response.profileObj.email,
        photo: response.profileObj.imageUrl,
        password: response.profileObj.googleId,
      };
      const responseFromAPI = await axios.post('http://localhost:8080/api/auth/register', dataGoogle);
      setEmail('');
      setPhoto('');
      setPassword('');
      Swal({
        title: 'Successful registration',
        text: 'Registration completed successfully!',
        icon: 'success',
        button: 'OK',
      });
  
      console.log('Successful registration:', responseFromAPI.data);
      navigate('/verifyAccount');
    } catch (error) {
      console.error('Sign up failed:', error);
      Swal({
        title: 'Failed registration',
        text: 'Registration failed. Please try again.',
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
  

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedPhoto = localStorage.getItem('photo');

    if (storedEmail) {
      setEmail(storedEmail);
      inputemail.current = storedEmail;
    }

    if (storedPassword) {
      setPassword(storedPassword);
      inputpassword.current = storedPassword;
    }
    if (storedPhoto) {
      setPhoto(storedPhoto);
      inputphoto.current = storedPhoto;
    }
  }, []);

  return (
    <main className="flex w-full h-screen items-center justify-center bg-[#111827]">
    <div className="flex flex-wrap flex-col justify-center items-center w-screen h-screen " >
      <Sidebar />
      <div className="flex flex-row justify-center items-center bg-[#080C13] rounded-lg py-4 px-12 w-3/5">
      <div className="flex flex-col w-full items-center justify-center">
      <h2 className='my-4  text-center text-[30px] flex-wrap font-bold text-[#EBEBEC]'>WELCOME <span className='text-amber-300'>GAMER!</span></h2>
      <p className='text-center text-[15px] flex-wrap font-bold text-[#EBEBEC] tracking-[0.8px]'>G4A is waiting for you...</p>
      <img className='my-8 rounded-lg' src="/public/Captura de pantalla (101).png" alt="" />
      </div>
      <div>
        <form className="flex flex-col items-start m-2 sm:m-0 space-y-3">
          <label className="font-bold ml-5 text-amber-300" htmlFor="email">Email</label>
          <input className="border-2 w-full p-0 md:p-1 lg:p-3 border-[rgba(31,31,31,0.50)] rounded-[5px] bg-zinc-800 hover:bg-zinc-700 text-[#FAFCFC]" type="email" id="email" name="email" value={email} placeholder='@' onChange={handleEmailChange} required />

          <label className="font-bold ml-5 text-amber-300" htmlFor="photo">Photo</label>
          <input className="border-2 w-full p-0 md:p-1 lg:p-3 border-[rgba(31,31,31,0.50)] rounded-[5px] bg-zinc-800 hover:bg-zinc-700 text-[#FAFCFC]" type="text" id="photo" name="photo" value={photo} placeholder='📷' onChange={handlePhotoChange} />

          <label className="font-bold ml-5 text-amber-300" htmlFor="password">Password</label>
          <input className="border-2 w-full p-0 md:p-1 lg:p-3 border-[rgba(31,31,31,0.50)] rounded-[5px] bg-zinc-800 hover:bg-zinc-700 text-[#FAFCFC]" type="password" id="password" name="password" placeholder='🔒' value={password} onChange={handlePasswordChange} required />


          <Link to={"/home"} onClick={handleRegisterClick} className="flex w-[70vw] md:w-[30vw] h-12 flex-col items-center justify-center shrink-0 rounded-[5px] hover:bg-zinc-950 border border-solid border-amber-300 bg-gradient-to-r from-amber-400 to-amber-700 transition-colors duration-500 hover:from-amber-400 hover:to-amber-600 text-[#FAFCFC] text-sm not-italic font-bold leading-[normal] tracking-[0.7px]" type="button">Register</Link>
            <GoogleLogin
              clientId={clientID}
              render={renderProps => (
                <button className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[5px] hover:bg-zinc-950  border-solid border-white flex justify-center items-center" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <img src="/public/Google.png" className="w-6 h-6 shrink-0" />
                <p className="ms-2 text-[#FAFCFC] text-center text-sm not-italic font-bold leading-[normal] tracking-[0.7px]">Register with Google</p></button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />,
        </form>
        <p className='text-sm not-italic font-medium leading-[normal] md:text-base text-[#FAFCFC]'>Already have an account? <span className="cursor-pointer text-lg text-amber-400 hover:text-amber-300">Log in</span></p>
        <p className='text-sm not-italic font-medium leading-[normal] md:text-base text-[#FAFCFC]'>Go back to <Link to={"/home"} className="cursor-pointer text-lg text-amber-400 hover:text-amber-300">Home page</Link></p>
        </div>
      </div>
    </div>
    </main>
  );
}
