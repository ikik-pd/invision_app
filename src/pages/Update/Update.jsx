import { addDoc, collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import uuid from 'react-uuid';
import * as Styled from './Update.styles';
import userEvent from '@testing-library/user-event';
import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import { LeftBtn } from '../Detail/Detail.styles';
import left_icon from '../../assets/img/left_icon.png';

function Update() {
  const params = useParams();
  const [content, setContent] = useState();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // contents컬렉션에서 해당 게시물 정보 가져옴
      const snapContent = await getDoc(doc(db, 'contents', params.id));
      console.log(snapContent);
      if (snapContent.exists()) {
        const data = snapContent.data();
        console.log('유저 uid. : ', snapContent.data().uid);
        console.log('params.id : ', params.id);
        setContent(data);
        setTitle(data.title);
        setDesc(data.desc);
        setSelectedFile(data.userImg);
      } else {
        console.log('No such document');
      }
    };

    fetchData();
  }, []);

  const [contents, setContents] = useState([]);
  const [user, setUser] = useState({
    userImgUrl: 'http://dh.aks.ac.kr/Edu/wiki/images/5/50/%EC%A7%B1%EA%B5%AC.jpeg:',
    nickname: '로그인이 필요합니다' //-->로그인을 했는데 초기값이 나옴
  });

  const [uploadImgUrl, setUploadImgUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }

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

  const updateContent = async (event) => {
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
    }; //-->처음에만 댓글 빈배열

    setContents(newContent);
    handleUpload();

    await updateDoc(doc(db, 'contents', params.id), {
      title,
      desc
    });

    setTitle('');
    setDesc('');
  };

  const handleFileSelect = (event) => {
    handleUpload(event.target.files[0]);
  };

  const handleUpload = async (file) => {
    if (!file) {
      return;
    }
    const imageRef = ref(storage, `forder/${uuid()}`);
    await uploadBytes(imageRef, file);

    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, 'contents', params.id), {
      imgUrl: downloadURL
    }); // 태그에도 img URL , firebase img URL = 렌더가 안됩니다.?
  };

  return (
    <>
      <Header />
      <Styled.Layout>
        <Link to={'/'}>
          <LeftBtn src={left_icon} alt="뒤로가기" />
        </Link>
        <Styled.Container>
          <>
            <div style={{ width: '40%' }}>
              {content && (
                <Styled.PhotoBox>
                  <img src={content.imgUrl} />
                </Styled.PhotoBox>
              )}
              <Styled.UploadBox>
                <Styled.UploadPhoto>
                  <Styled.FileButton htmlFor="input-file">클릭하여 파일 선택</Styled.FileButton>
                  <input type="file" onChange={handleFileSelect} id="input-file" style={{ display: 'none' }} />
                </Styled.UploadPhoto>
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
                      <Styled.AddButton onClick={updateContent}>저장</Styled.AddButton>
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
    </>
  );
}

export default Update;
