import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function Dropdown() {
  return (
    <DropUlTag>
      <Link to={'/mypage/:id'} style={{ textDecoration: 'none', color: '#000' }}>
        <DropLiTag>마이페이지</DropLiTag>
      </Link>
      <DropLiTag>로그아웃</DropLiTag>
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
  }
`;

export default Dropdown;
