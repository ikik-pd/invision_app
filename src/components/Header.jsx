import { styled } from 'styled-components';
import Button from '../components/Button';
import searchIcon from '../assets/img/search-icon.svg';
import userIcon from '../assets/img/user-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import In_VISION_logo from '../assets/img/In_VISION_logo.png';
import Login from './Login';
import { auth } from '../firebase';
import Dropdown from './Dropdown';
import { useState } from 'react';

function Header() {
  // 마이페이지, 로그인 여부 드롭다운
  const [isDropdownView, setDropdownView] = useState(false);

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };

  return (
    <HEADER_ST>
      <Link to={'/'}>
        <H1_ST src={In_VISION_logo} alt="로고"></H1_ST>
      </Link>
      <FORM_ST
        onSubmit={(event) => {
          event.preventDefault();
          alert('개발 중입니다.');
        }}
      >
        <SEARCHICON_ST src={searchIcon} alt="돋보기 아이콘" />
        <INPUT_ST type="text" placeholder="어떤 걸 찾으시나요?" />
      </FORM_ST>
      <RIGHTBOX_ST>
        <Button>
          <Link to={`/post`} style={{ color: '#fff', textDecoration: 'none' }}>
            글쓰기
          </Link>
        </Button>

        {/* <Link to={`/showdetail`}> */}
        <USERICON_ST src={userIcon} alt="사용자 아이콘" onClick={handleClickContainer} />
        <div onBlur={handleBlurContainer}>{isDropdownView && <Dropdown />}</div>
        {/* </Link> */}
      </RIGHTBOX_ST>
    </HEADER_ST>
  );
}

const HEADER_ST = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
`;

const H1_ST = styled.img`
  width: 220px;
`;

const FORM_ST = styled.form`
  width: 70%;
  position: relative;
  display: flex;
  align-items: center;
`;

const INPUT_ST = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: #efefef;
  padding-left: 40px;
  font-size: 18px;
`;

const SEARCHICON_ST = styled.img`
  position: absolute;
  left: 10px;
  z-index: 1;
  cursor: pointer;
`;

const RIGHTBOX_ST = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const USERICON_ST = styled.img`
  cursor: pointer;
  width: 50px;
`;

export default Header;
