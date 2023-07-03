import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Footer from '../../components/Footer';

function Mypage() {
  const initialState = {
    nickname: '',
    email: '',
    userImg: ''
  };

  const [user, setUser] = useState(initialState);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const email = user.email;
        const uid = user.uid;

        console.log('로그인 회원 정보 : ', uid, ' ', email);

        const fetchData = async () => {
          const snapUser = await getDoc(doc(db, 'users', uid));

          if (snapUser.exists()) {
            setUser(snapUser.data());
            setPreview(snapUser.data().userImgUrl);
          } else {
            console.log('No such document');
          }
        };
        fetchData();
      } else {
      }
    });
  }, []);

  const uploadHandler = (event) => {
    handleFileSelect(event.target.files[0]);
    let image = URL.createObjectURL(event.target.files[0]);
    setPreview(image);
  };

  const handleFileSelect = async (file) => {
    const imageRef = ref(storage, `folder/${user.email}`);
    await uploadBytes(imageRef, file);

    const downloadURL = await getDownloadURL(imageRef);

    await updateDoc(doc(db, 'users', auth.currentUser?.uid), {
      userImgUrl: downloadURL
    });
  };

  return (
    <>
      <Header />
      <Layout>
        <Inner>
          <ProfileWrapper>
            <FigureImg>
              <ProfileLabel htmlFor="input-file">
                <ProfileImg src={preview} />
              </ProfileLabel>
            </FigureImg>

            <input
              id="input-file"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={uploadHandler}
              style={{ display: 'none' }}
            ></input>
            <ProfileName>{user.nickname}</ProfileName>
            <ProfileId>{user.email}</ProfileId>
          </ProfileWrapper>

          <FeedWrapper>
            <FeedTitle>
              피드<FeedBadge>7</FeedBadge>
            </FeedTitle>

            <FeedCardWrapper>
              <div></div>
            </FeedCardWrapper>
          </FeedWrapper>
        </Inner>
      </Layout>
      <Footer />
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 150px;
`;

const Inner = styled.div`
  width: 100%;
  padding: 80px 20px 0 20px;
  box-sizing: border-box;
`;

const ProfileWrapper = styled.div`
  width: inherit;
  text-align: center;
`;

const FigureImg = styled.div`
  width: 90px;
  height: 90px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 100%;
  margin: 0 auto;
`;

const ProfileLabel = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 12px 0 4px;
`;

const ProfileId = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #5f5f5f;
`;

const ProfileEditButton = styled.button`
  border: 1px solid #000;
  border-radius: 30px;
  font-size: 14px;
  padding: 7px 24px;
  margin-top: 14px;
  transition: 0.3 ease;

  &:hover {
    background-color: #ff385c;
    border-color: #ff385c;
    color: #fff;
    transition: 0.3s ease;
  }
`;

const FeedWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const FeedTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
`;

const FeedBadge = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #ff385c;
  margin-left: 5px;
`;

const FeedCardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-gap: 12px;
  margin-top: 18px;
`;

const FeedCard = styled.div`
  width: 100%;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`;

const FeedCardFigure = styled.figure`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #efefef;
  border-radius: 12px;
`;

const FeedCardImg = styled.img`
  width: 100%;
`;

const FeedCardImgOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: inherit;
  transition: 0.2s ease;

  ${FeedCard}:hover & {
    opacity: 1;
    transition: 0.2s ease;
  }
`;

const FeedCardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  padding-left: 6px;
`;

const ImgUploadButton = styled.button`
  font-size: 20px;
`;

export default Mypage;
