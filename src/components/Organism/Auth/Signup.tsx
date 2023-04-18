import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCheckValidate from 'src/hooks/handleCheckValidate';
import authApi from 'src/services/auth';
import styled from 'styled-components';

const Signup = ()=> {
  const navigate = useNavigate();

  const [password,setPassword] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const {signup} = authApi
  const { isReady, handleCheckValidate } = useCheckValidate(password, email);

  const onSignup = async ()=>{
    try{
      const res = await signup({email,password});
      if(res.status===201){
        navigate('/signin');
      }
    }catch(e:any){
      alert(e);
      throw new Error(e);
    }
  }

  useEffect(() => {
    handleCheckValidate();
  }, [handleCheckValidate]);

  return (
  <Container>
    <InfoWrap>
      <InfoInput onChange={(e)=>setEmail(e.target.value)} data-testid="email-input" placeholder='이메일을 입력하세요.' />
      <InfoInput type='password' onChange={(e)=>setPassword(e.target.value)} data-testid="password-input" placeholder='비밀번호를 입력하세요.' />
      <LoginBtn isReady={isReady} disabled={!isReady} onClick={()=>onSignup()} data-testid="signin-button">회원가입</LoginBtn>
      <RegistLine> 
        <RegistLink onClick={()=>navigate('/signin')}>취소</RegistLink> 
      </RegistLine>
    </InfoWrap>
  </Container>
  )
}

const RegistLine = styled.div`
  width:100%;
  text-align:right;
  margin-top:10px;
`
const RegistLink = styled.span`
  cursor:pointer;
  &:hover{
    font-weight:bold;
  }
`

const InfoInput = styled.input`
  display:block;
  height:30px;
  border:none;
  border-bottom:1px solid #ccc;
  outline:none;
  margin-top:20px;
  width:100%;
`

const LoginBtn = styled.button<{isReady:boolean}>`
  cursor: ${({isReady})=>isReady ? 'pointer':'default'};
  width:100%;
  margin-top:30px;
  background-color: ${({isReady})=>isReady ? 'tomato':'#ccc'};
  color: #fff;
  font-size:16px;
  font-weight:bold;
  padding:12px;

`

const Container = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const InfoWrap = styled.div`
  max-width:400px;
  overflow:hidden;
  width:400px;
`

export default Signup