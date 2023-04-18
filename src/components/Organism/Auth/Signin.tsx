import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authApi from 'src/services/auth';
import styled from 'styled-components'


const Signin = ()=> {
  const navigate = useNavigate();
  const [isReady,setIsReady] = useState(false); 
  const [password,setPassword] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const {signin} = authApi;

  const handleCheckValidate = useCallback(()=>{
    if (password.length>=8 && email.includes('@')) setIsReady(true);
    else setIsReady(false);
  },[password,email]) 

  const onSignin = async ()=>{
    try{
      const res = await signin({email,password});
      if(res.status === 200){
        localStorage.setItem('token',res.data.access_token);
        navigate('/todo');
      }
    }catch(e:any){
      alert('로그인에 실패하였습니다.');
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
        <LoginBtn isReady={isReady} disabled={!isReady} onClick={()=>onSignin()} data-testid="signin-button">로그인</LoginBtn>
        <RegistLine> 
          <RegistLink onClick={()=>navigate('/signup')}>회원가입</RegistLink> 
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

export default Signin