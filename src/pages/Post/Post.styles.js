import styled from "styled-components";

export const Layout = styled.div`
  max-width: 1200px;
  min-width: 1000px;

  /* box-sizing: border-box; */
  /* text-align: center; */
  display: flex;

  justify-content: center;

  margin: 300px auto;
`;
export const Container = styled.div`
  font-family: "Cafe24Ssurround";
  /* color: burlywood; */
  /* border: 2px solid burlywood; */
  box-shadow: 5px 5px 20px 5px #e5e5e5;
  border-radius: 30px;
  display: flex;

  width: 850px;
  height: 600px;

  /* margin: auto; */
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

  /* object-fit: contain; */
`;

export const TextBox = styled.div`
  /* background-color: lightgrey; */
  border-radius: 30px;
  width: 50%;
  height: 100%;
  /* margin-left: 40px; */
  box-sizing: border-box;
  padding-left: 35px;
  padding-right: 20px;
`;

export const SmallTextBox = styled.div`
  /* border: 1px solid black; */
  border-radius: 30px;

  width: 100%;
  height: 50%;

  box-sizing: border-box;
  padding-top: 40px;
`;
export const ContentBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentTitle = styled.div`
  font-size: 2em;
  font-weight: bold;

  /* margin: 30px 0; */
`;
export const ContentInputTitle = styled.input`
  font-size: 1.5em;
  /* background-color: lightgray; */
  border: transparent;
  border-bottom: 1px solid black;
  /* border-radius: 30px; */
  width: 370px;
  margin: 30px 0;
`;

export const ContentDesc = styled.div`
  font-size: 1em;
  line-height: 140%;

  /* overflow-y: auto;
  word-wrap: break-word;

  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: white;
  } */
`;
export const ContentInputDesc = styled.textarea`
  font-size: 1.3em;
  line-height: 140%;
  width: 370px;
  height: 320px;

  border: transparent;
  border-bottom: 1px solid black;

  margin-bottom: 20px;
  /* overflow-y: auto;
  word-wrap: break-word;

  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: white;
  } */
`;
// const ListBoxForm = styled.form`
//   width: 100%;
//   height: 35px;
//   margin-top: 20px;

//   box-sizing: border-box;
// `;
// const FormInput = styled.input`
//   border: transparent;
//   background-color: lightgray;
//   border-radius: 30px;

//   width: 95%;
//   height: 35px;
//   margin-right: 3px;

//   font-size: 20px;
//   padding-left: 20px;
// `;
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
/* object-fit: contain; */

export const UserImgBox = styled.div`
  width:50px
  height: 50px
  overflow: hidden;
  border-radius: 50px;
  margin-right: 10px
`;
export const PhotoBox = styled.div`
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
