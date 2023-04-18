import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import SigninTemplate from 'src/components/Template/auth/Signin'

const Login = ()=> {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(()=>{
    if(isLoggedIn) navigate('/todo')
  },[])

  return (
    <SigninTemplate/>
  )
}

export default Login