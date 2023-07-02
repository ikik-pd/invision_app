import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import uuid from 'react-uuid';
import * as Styled from './Post.styles';
import userEvent from '@testing-library/user-event';
import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Login';

function Post() {
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState({
    //닉네임이나 이미지 설정 안했을 때 초기값 세팅
    userImgUrl: 'http://dh.aks.ac.kr/Edu/wiki/images/5/50/%EC%A7%B1%EA%B5%AC.jpeg:',
    nickname: '로그인이 필요합니다' //-->로그인을 했는데 초기값이 나옴
  });
  // const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImgUrl, setUploadImgUrl] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if (auth.currentUser === null) {
    //   alert("로그인이 필요합니다.");
    //   // console.log(auth.currentUser);
    //   navigate("/");
    // }
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const email = user.email;
        const uid = user.uid;
        console.log('로그인 상태입니다.');
        console.log('로그인 회원 정보 : ', uid, ' ', email);
      }
    });

    const fetchData = async () => {
      if (!auth.currentUser) return;
      // users 컬렉션에서 로그인한 사람의 정보를 가져옴
      const snapUser = await getDoc(doc(db, 'users', auth.currentUser.uid));

      if (snapUser.exists()) {
        console.log(snapUser.data());
        setUser(snapUser.data());
      }
    };

    fetchData();
  }, []);

  console.log(user);
  const onChangeTitle = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'title') {
      setTitle(value);
    }
  };

  const onChangeDesc = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'desc') {
      setDesc(value);
    }
  };

  const addContent = async (event) => {
    event.preventDefault();
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    const newContent = {
      title: title,
      desc: desc,
      imgUrl: uploadImgUrl,
      uid: auth.currentUser.uid, //-->로그인한 사람의 uid
      comments: [],
      userNickname: user.nickname,
      userImg: user.userImgUrl
      // userImg: user.Img,
      // 글을 누가 적었는지 확인 가능
      // uid: uid
    }; //-->처음에만 댓글 빈배열

    setContents(newContent);
    setTitle('');
    setDesc('');

    const collectionRef = collection(db, 'contents');

    await addDoc(collectionRef, newContent);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('사진을 넣어주세요.');
      return;
    }
    //// ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장
    const imageRef = ref(storage, `forder/${uuid()}`);
    // const imageRef = ref(
    //   storage,
    //   `${auth.currentUser.uid}/${selectedFile.name}`
    // );

    await uploadBytes(imageRef, selectedFile);

    //파일 URL 가져오기
    const downloadURL = await getDownloadURL(imageRef);
    console.log('downloadURL', downloadURL);
    setUploadImgUrl(downloadURL);
  };

  // const addButton = () => {
  //   handleUpload();
  //   addContent();

  // };

  return (
    <Styled.Layout>
      {isOpen && <Login setIsOpen={setIsOpen} />}
      <Styled.Container>
        <>
          <div style={{ width: '40%' }}>
            <Styled.PhotoBox>
              <Styled.UploadPhoto>
                <Styled.FileButton htmlFor="input-file">클릭하여 파일 선택</Styled.FileButton>
                <input type="file" onChange={handleFileSelect} id="input-file" style={{ display: 'none' }} />
              </Styled.UploadPhoto>
            </Styled.PhotoBox>
            <Styled.UploadBox>
              <Styled.UploadButton onClick={handleUpload}>파일 업로드</Styled.UploadButton>
            </Styled.UploadBox>
          </div>

          <Styled.TextBox>
            <Styled.SmallTextBox>
              <Styled.ContentBox>
                <Styled.UserImgBox>
                  <Styled.UserImg src={user.userImgUrl} />
                </Styled.UserImgBox>
                <h1>{user.nickname}</h1>
              </Styled.ContentBox>
              <div>
                <form
                  onSubmit={function (event) {
                    event.preventDefault();
                  }}
                >
                  <Styled.ContentTitle>
                    <Styled.ContentInputTitle
                      type="text"
                      placeholder="Add title"
                      value={title}
                      name="title"
                      onChange={onChangeTitle}
                      required
                    />
                  </Styled.ContentTitle>
                  <Styled.ContentDesc>
                    <Styled.ContentInputDesc
                      type="text"
                      placeholder="Add description"
                      value={desc}
                      name="desc"
                      onChange={onChangeDesc}
                    />
                  </Styled.ContentDesc>
                  <Styled.ButtonBox>
                    <Styled.AddButton onClick={addContent}>저장</Styled.AddButton>
                  </Styled.ButtonBox>
                </form>
              </div>
              {/* <ContentTitle>{content.title}</ContentTitle>
              <ContentDesc>{content.desc}</ContentDesc> */}
            </Styled.SmallTextBox>
          </Styled.TextBox>
        </>
      </Styled.Container>
    </Styled.Layout>
  );
}

export default Post;
