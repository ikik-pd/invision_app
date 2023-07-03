import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import * as Styled from './Home.styles';
import Footer from '../../components/Footer';

function Home() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'contents'));
      const querySnapshot = await getDocs(q);

      console.log('content data : ', querySnapshot);
      const initialComments = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };

        initialComments.push(data);
      });
      console.log(initialComments);

      setContents(initialComments);
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
