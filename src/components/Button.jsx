import { styled } from 'styled-components';

const Button = styled.button`
  background-color: #000;
  color: #fff;
  width: 76px;
  height: 34px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-size: 18px;
  transition: 0.4s;

  &:hover {
    background-color: #ff385c;
  }
`;

export default Button;
