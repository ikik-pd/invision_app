import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import uuid from 'react-uuid';
import * as Styled from './Post.styles';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Login';

function Post() {
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState({
    userImgUrl: null,
    nickname: '로그인이 필요합니다'
  });

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImgUrl, setUploadImgUrl] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      alert('로그인이 필요합니다.');

      navigate('/');
    }
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
    if (!title || !selectedFile) {
      alert('사진과 제목 모두 입력해주세요.');
      return;
    }

    const newContent = {
      title: title,
      desc: desc,
      imgUrl: uploadImgUrl,
      uid: auth.currentUser.uid,
      comments: [],
      userNickname: user.nickname,
      userImg: user.userImgUrl
    };

    console.log(newContent);

    setContents(newContent);
    setTitle('');
    setDesc('');
    alert('게시물이 등록되었습니다.');
    navigate('/');

    const collectionRef = collection(db, 'contents');
    await addDoc(collectionRef, newContent);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('사진을 등록해 주세요.');
      return;
    }

    const imageRef = ref(storage, `folder/${uuid()}`);

    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log('downloadURL : ', downloadURL);
    setUploadImgUrl(downloadURL);
  };

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
            </Styled.SmallTextBox>
          </Styled.TextBox>
        </>
      </Styled.Container>
    </Styled.Layout>
  );
}

export default Post;
