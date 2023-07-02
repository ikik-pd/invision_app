import styled from 'styled-components';

export const LeftBtn = styled.img`
  width: 45px;
  margin-right: 50px;
`;

export const Layout = styled.div`
  max-width: 1200px;
  min-width: 1000px;

  /* box-sizing: border-box; */
  /* text-align: center; */
  display: flex;

  justify-content: center;

  margin: 130px auto;
`;
export const Container = styled.div`
  font-family: 'Cafe24Ssurround';
  /* color: burlywood; */
  /* border: 2px solid burlywood; */
  box-shadow: 5px 5px 20px 5px #e5e5e5;
  border-radius: 30px;
  display: flex;

  width: 670px;
  height: 600px;
  padding: 20px;
`;

export const ContentDesc = styled.div`
  font-size: 1.3em;
  line-height: 140%;
  overflow-y: auto;
  /* word-break: break-all */
  /* word-break: break-word */
  /* padding: 10px; */
  word-wrap: break-word;

  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: white;
  }
`;

export const Backbutton = styled.button`
  background-color: burlywood;
  border: none;

  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  height: 40px;
  width: 70px;
  transition: 0.2s;
  &:hover {
    background-color: #ddd;
  }
`;

export const PhotoBox = styled.div`
  /* background-color: #ff385c; */
  border-radius: 30px;
  overflow: hidden;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
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
export const UserBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const UserImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
`;
/* object-fit: contain; */

export const UserImgBox = styled.div`
  /* display: flex; */
  width: 50px;
  height: 50px;
  /* overflow: hidden; */
  border-radius: 50px;
  margin-right: 10px;
`;

export const ContentTitle = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  margin: 30px 0;
`;
export const ListBox = styled.div`
  /* border: 1px solid black; */
  border-radius: 30px;
  width: 100%;
  height: 50%;
  /* margin-top: 20px; */

  box-sizing: border-box;
  padding-top: 20px;
`;
export const H1 = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
`;
export const CommentListBox = styled.div`
  /* border: 1px solid black; */
  /* border-radius: 30px; */

  width: 100%;
  height: 65%;
  margin-top: 30px;

  box-sizing: border-box;
  overflow-y: auto;
  /* word-break: break-all */
  /* word-break: break-word */
  /* padding: 10px; */
  word-wrap: break-word;

  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: white;
  }
`;
export const CommentBox = styled.div`
  width: 100%;

  margin-bottom: 15px;

  box-sizing: border-box;
`;
export const Comment = styled.div`
  font-size: 1.2em;

  box-sizing: border-box;
`;
export const ListBoxForm = styled.form`
  width: 100%;
  height: 35px;
  margin-top: 20px;

  box-sizing: border-box;
`;
export const FormInput = styled.input`
  border: transparent;
  background-color: lightgray;
  border-radius: 30px;

  width: 95%;
  height: 35px;
  margin-right: 3px;

  font-size: 20px;
  padding-left: 20px;
`;

export const Crud = styled.li`
  text-align: center;
  padding: 5px;
  font-size: 15px;
  &:hover {
    background-color: #dcdcdc;
  }
`;

export const Cruds = styled.ul`
  cursor: pointer;
  position: absolute;
  width: 50px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const DotsWrapper = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;

  &:hover {
    background-color: #ff385c;
    color: #fff;
    transition: 0.3s ease;
  }
`;

export const DrawerFunction = styled.div`
  position: relative;
`;
