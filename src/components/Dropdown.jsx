import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Login from './Login';
import { auth } from '../firebase';

function Dropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logOut = async (event) => {
    event.preventDefault();
    try {
      const userLogout = await signOut(auth);
      alert('로그아웃 되었습니다.');
      navigate('/');
      console.log('로그아웃 완료');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with logOut', errorCode, errorMessage);
    }
  };
  return (
    <DropUlTag>
      <DropLiTag
        onClick={() => {
          setIsOpen(true);
        }}
      >
        로그인
      </DropLiTag>
      {isOpen && <Login setIsOpen={setIsOpen} />}
      <DropLiTag onClick={logOut}>로그아웃</DropLiTag>
      <Link to={'/mypage/:id'} style={{ textDecoration: 'none', color: '#000' }}>
        <DropLiTag>마이페이지</DropLiTag>
      </Link>
    </DropUlTag>
  );
}

const DropUlTag = styled.ul`
  width: 100px;
  position: absolute;
  box-shadow: 0 5px 13px -7px #000000bd;
  top: 90px;
  right: 20px;
  border-radius: 5px;
  padding: 10px;
  line-height: 30px;
`;

const DropLiTag = styled.li`
  &:hover {
    color: #ff385c;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Dropdown;
