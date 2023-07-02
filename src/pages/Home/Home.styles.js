import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContentsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  justify-items: center;
  margin: 100px 50px;
`;

export const PhotoImg = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 30px;
  object-fit: cover;
`;

export const PhotoDiv = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 100px;
`;

export const ContentTitle = styled.div`
  width: 300px;
  height: 50px;
  display: block;
  margin-top: 15px;
  padding-left: 20px;
`;

export const TitleView = styled.h2`
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 50px;
`;

export const UserImgBox = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50px;
  margin-right: 10px;
`;
