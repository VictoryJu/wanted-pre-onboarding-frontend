import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupTemplate from "src/components/Template/auth/Signup"

const Regist = ()=> {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(()=>{
    if(isLoggedIn) navigate('/todo')
  },[])
  return (
    <SignupTemplate/>
  )
}

export default Regist