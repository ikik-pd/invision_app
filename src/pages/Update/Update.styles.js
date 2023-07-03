import styled from 'styled-components';

export const Layout = styled.div`
  max-width: 1200px;
  min-width: 1000px;

  display: flex;

  justify-content: center;

  margin: 130px auto;
`;
export const Container = styled.div`
  font-family: 'Cafe24Ssurround';

  box-shadow: 5px 5px 20px 5px #e5e5e5;
  border-radius: 30px;
  display: flex;

  width: 670px;
  height: 600px;
  padding: 20px;
`;
export const FileButton = styled.label`
  cursor: pointer;
  padding: 6px 25px;
  border-radius: 4px;

  color: white;
  font-weight: bold;
  font-size: 20px;
`;
export const PhotoImg = styled.img`
  width: 100%;
  border-radius: 30px;
`;

export const TextBox = styled.div`
  border-radius: 30px;
  width: 50%;
  height: 100%;

  box-sizing: border-box;
  padding-left: 35px;
  padding-right: 20px;
`;

export const SmallTextBox = styled.div`
  border-radius: 30px;

  width: 100%;
  height: 50%;

  box-sizing: border-box;
  padding-top: 30px;
`;
export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ContentTitle = styled.div`
  width: 100%;
  font-size: 2em;
  font-weight: bold;
`;
export const ContentInputTitle = styled.input`
  font-size: 1.5em;

  border: transparent;
  border-bottom: 1px solid black;

  width: 100%;
  margin: 30px 0;
`;

export const ContentDesc = styled.div`
  width: 100%;
  font-size: 1em;
  line-height: 140%;
`;
export const ContentInputDesc = styled.textarea`
  font-size: 1.3em;
  line-height: 140%;
  width: 100%;
  height: 320px;

  border: transparent;
  border-bottom: 1px solid black;

  margin-bottom: 20px;
`;

export const AddButton = styled.button`
  background-color: #000;
  transition: 0.3s ease;

  flex: 0 0 auto;
  height: 40px;
  outline: 0px;
  padding: 0px 14px;
  border-radius: 0px 8px 8px 0px;

  font-weight: bold;
  color: white;

  cursor: pointer;
  pointer-events: auto;

  &:hover {
    background-color: #ff385c;
    color: #fff;
    transition: 0.3s ease;
  }
`;
export const ButtonBox = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  float: right;
`;
export const UserImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
`;

export const UserImgBox = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50px;
  margin-right: 10px;
`;
export const PhotoBox = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: lightgray;
  border-radius: 30px;
  overflow: hidden;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
`;

export const UploadPhoto = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;
export const UploadButton = styled.button`
  cursor: pointer;
  padding: 6px 25px;
  border-radius: 4px;

  color: white;
  font-weight: bold;
  font-size: 20px;
`;
export const UploadBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  height: 108px;
  width: 100%;

  background-color: lightgray;
  border-radius: 30px;
`;
