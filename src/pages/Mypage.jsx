import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Login from "../components/Login";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db, storage} from "../firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";
import uuid from "react-uuid";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

function Mypage() {
  const initialState = {
    nickname: "",
    email: "",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(initialState);

  const [selectedFile, setSelectedFile] = useState();
  const [uploadImgUrl, setUploadImgUrl] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const email = user.email;
        const uid = user.uid;

        console.log("로그인 회원 정보 : ", uid, " ", email);

        const fetchData = async () => {
          const snapUser = await getDoc(doc(db, "users", uid));

          if (snapUser.exists()) {
            // console.log(snapUser.data());
            setUser(snapUser.data());
          } else {
            console.log("No such document");
          }
        };
        fetchData();
      } else {
      }
    });
  }, []);

  console.log("user UID: ", user);

  const handleFileSelect = async (event) => {
    await setSelectedFile(event.target.files[0]);

    const imageRef = ref(storage, `forder/${uuid()}`);
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    await setUploadImgUrl(downloadURL);
    console.log("imgURL: ", downloadURL);

    await setDoc(doc(db, "users", user.uid), {
      userImgUrl: downloadURL,
    });
  };

  return (
    <>
      <Header />
      <Layout>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          로그인
        </button>
        {isOpen && <Login setIsOpen={setIsOpen} />}
        <Inner>
          <ProfileWrapper>
            <ProfileImg></ProfileImg>
            <input onClick={handleFileSelect} type="file"></input>
            <ProfileName>{user.nickname}</ProfileName>
            <ProfileId>{user.email}</ProfileId>
            <ProfileEditButton>설정</ProfileEditButton>
          </ProfileWrapper>

          <FeedWrapper>
            <FeedTitle>
              피드<FeedBadge>7</FeedBadge>
            </FeedTitle>

            <FeedCardWrapper>
              <FeedCard>
                <FeedCardFigure>
                  <FeedCardImg></FeedCardImg>
                  <FeedCardImgOverlay></FeedCardImgOverlay>
                </FeedCardFigure>

                <FeedCardTitle>미니멀리즘을 추구하는 조명</FeedCardTitle>
              </FeedCard>
            </FeedCardWrapper>
          </FeedWrapper>
        </Inner>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
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

const ProfileImg = styled.div`
  width: 90px;
  height: 90px;
  background-image: url();
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #efefef;
  border-radius: 100%;
  margin: 0 auto;
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
