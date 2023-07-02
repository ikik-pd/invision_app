import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import * as Styled from './Home.styles';
import Footer from '../../components/Footer';

function Home() {
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'contents'));
      const querySnapshot = await getDocs(q);

      console.log('content data : ', querySnapshot);
      const initialComments = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        //doc.id를 포함한 데이터를 가져와 추가한다
        const data = {
          id: doc.id,
          ...doc.data()
        };
        // console.log("data", data);
        initialComments.push(data);
      });
      console.log(initialComments);
      // firestore에서 가져온 데이터를 state에 전달
      setContents(initialComments);

      // const snapUser = await getDoc(doc(db, "users", "user"));

      // if (snapUser.exists()) {
      //   console.log(snapUser.data());
      //   setUser(snapUser.data());
      // } else {
      //   console.log("No such document");
      // }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Styled.ContentsBox>
          {contents.map(function (content) {
            return (
              <Styled.PhotoDiv key={content.id}>
                <Styled.StyledLink to={`/showdetail/${content.id}`}>
                  <Styled.PhotoImg src={content.imgUrl} />
                  <Styled.ContentTitle>
                    {content.title}
                    <Styled.UserBox>
                      <Styled.UserImgBox>
                        <Styled.UserImg src={content.userImg} />
                      </Styled.UserImgBox>

                      <h1>{content.userNickname}</h1>
                    </Styled.UserBox>
                  </Styled.ContentTitle>
                </Styled.StyledLink>
              </Styled.PhotoDiv>
            );
          })}
        </Styled.ContentsBox>
      </div>
      <Footer />
    </>
  );
}

export default Home;
