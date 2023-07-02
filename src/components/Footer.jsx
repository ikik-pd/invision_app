import { styled } from 'styled-components';
import In_VISION_white_logo from '../assets/img/In-VISION_white_logo.png';
import gitLogo from '../assets/img/git_icon.svg';

function Footer() {
  return (
    <FOOTER>
      <FOOTERLOGO src={In_VISION_white_logo} alt="로고" />
      <COPYRIGHT>Copyright 2023. VISION-6조. All rights reserved.</COPYRIGHT>
      <GITLOGO
        src={gitLogo}
        alt="깃 로고"
        onClick={() => window.open('https://github.com/ikik-pd/invision', '_blank')}
      />
    </FOOTER>
  );
}

const FOOTER = styled.footer`
  background-color: #ff385c;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
`;

const FOOTERLOGO = styled.img`
  width: 220px;
`;

const COPYRIGHT = styled.p`
  color: #fff;
  font-size: 18px;
`;

const GITLOGO = styled.img`
  width: 50px;
  filter: invert();
  cursor: pointer;
`;

export default Footer;
