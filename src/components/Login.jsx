import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const email = user.email;
        const uid = user.uid;
        console.log('로그인 회원 정보 : ', uid, ' ', email);
      }
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'nickname') {
      setNickname(value);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공');
      setEmail('');
      setPassword('');
      setNickname('');
      alert('로그인 되었습니다.');
      setIsOpen(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('error with signUp', errorCode, errorMessage);
    }
  };
  const logOut = async (event) => {
    event.preventDefault();

    try {
      const userLogout = await signOut(auth);
      console.log('로그아웃 완료');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with logOut', errorCode, errorMessage);
    }
  };
  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('회원가입 성공');
      alert('회원가입이 완료되었습니다.');

      // console.log(userCredential.user.uid);
      //users 컬렉션에 로그인한 사람의 정보 저장를 userCredential.user.uid로 판별
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        id: userCredential.user.uid,
        email: email,
        nickname: nickname,
        //마이페이지에서 프로필 사진 변경할 수 있음
        userImgUrl: ''
      });
      setEmail('');
      setPassword('');
      setNickname('');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  return (
    <>
      <Layout>
        <LoginWrapper>
          <CloseButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </CloseButton>
          <LoginTitle>
            In-vision에 오신것을
            <br />
            환영합니다
          </LoginTitle>
          <form>
            <LoginInputWrapper>
              <LoginLabel>닉네임</LoginLabel>
              <LoginInput
                placeholder="닉네임"
                type="nickname"
                value={nickname}
                name="nickname"
                onChange={onChange}
                required
              ></LoginInput>
            </LoginInputWrapper>
            <LoginInputWrapper>
              <LoginLabel>이메일</LoginLabel>
              <LoginInput
                placeholder="이메일"
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                required
              ></LoginInput>
            </LoginInputWrapper>
            <LoginInputWrapper>
              <LoginLabel>비밀번호</LoginLabel>
              <LoginInput
                placeholder="비밀번호"
                type="password"
                value={password}
                name="password"
                onChange={onChange}
                required
              ></LoginInput>
            </LoginInputWrapper>
            <ButtonGroup>
              <LoginButton onClick={signIn}>로그인</LoginButton>
              <SignUpButton onClick={signUp}>회원가입</SignUpButton>
              <LogoutButton onClick={logOut}>로그아웃</LogoutButton>
            </ButtonGroup>
          </form>
        </LoginWrapper>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: rgba(0, 0, 0, 0.6); */
  position: absolute;
  top: 0;
  z-index: 99;
`;

const LoginWrapper = styled.div`
  position: absolute;

  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 30px;
  width: 300px;
  padding: 70px 100px 70px 100px;
  box-shadow: rgb(0 0 0 / 45%) 0px 2px 10px;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  margin-bottom: 32px;
`;

const LoginInputWrapper = styled.div`
  width: 100%;
`;

const LoginLabel = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
`;

const LoginInput = styled.input.attrs({ required: true })`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #cdcdcd;
  margin-bottom: 12px;
  box-sizing: border-box;

  &::placeholder {
    color: #cdcdcd;
  }
`;

const ButtonGroup = styled.div`
  display: block;
  width: 100%;
`;
const LoginButton = styled.button`
  width: 100%;
  padding: 12px 0;
  color: #fff;
  font-weight: 900;
  background-color: #000;
  border-radius: 30px;
  font-size: 16px;
  margin-top: 20px;
  transition: 0.3s ease;

  &:hover {
    background-color: #ff385c;
    color: #fff;
    transition: 0.3s ease;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  position: relative;

  padding: 12px 0;
  color: #fff;
  font-weight: 900;
  background-color: #000;
  border-radius: 30px;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    background-color: #ff385c;
    color: #fff;
    transition: 0.3s ease;
  }
`;

const LogoutButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #999;
  width: 100%;
  position: relative;

  padding: 12px 0;
  color: black;
  border: 1px solid black;
  border-radius: 30px;
  margin-top: 10px;
  &:hover {
    background-color: black;
    color: #fff;
    transition: 0.3s ease;
  }
`;
const CloseButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: black;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  float: right;

  &:hover {
    background-color: black;
    color: #fff;
    transition: 0.3s ease;
  }
`;
export default Login;
