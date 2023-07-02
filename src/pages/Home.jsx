import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

function Home() {
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "contents"));
      const querySnapshot = await getDocs(q);

      const initialComments = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        //doc.id를 포함한 데이터를 가져와 추가한다
        const data = {
          id: doc.id,
          ...doc.data(),
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
        {/* <Link to={`/post`}>➡️ Go to Post</Link> */}
        <ContentsBox>
          {contents.map(function (content) {
            // console.log(comment.id);
            return (
              <PhotoDiv key={content.id}>
                <StyledLink to={`/showdetail/${content.id}`}>
                  <PhotoImg src={content.imgUrl} />
                  <ContentTitle>
                    {content.title}
                    <UserBox>
                      <UserImgBox>
                        <UserImg
                          src={
                            "http://edtkr.com/wp-content/uploads/2022/09/%EC%A7%B1%EA%B5%AC%EA%B7%B9%EC%9E%A5%ED%8C%90_%EC%97%90%EB%93%80%ED%85%8C%ED%81%AC-1.jpg"
                          }
                        />
                      </UserImgBox>

                      <h1>{content.userNickname}</h1>
                    </UserBox>
                  </ContentTitle>
                </StyledLink>
              </PhotoDiv>
            );
          })}
        </ContentsBox>
      </div>
    </>
  );
}

export default Home;

const ContentsBox = styled.div`
  display: grid;
  /* grid-template-columns: repeat(5, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* grid-gap: 10px */
  justify-items: center;

  /* margin: 100px 50px 50px 100px; */
  margin: 100px 50px;

  /* object-fit: contain; */
`;

const PhotoImg = styled.img`
  width: 100%;
  height: 400px;
  /* border-radius: 30px; */
`;

const PhotoDiv = styled.div`
  width: 100%;
  height: 400px;
  /* border-radius: 30px; */
  margin-bottom: 100px;
`;

const ContentTitle = styled.div`
  width: 300px;
  height: 50px;
  display: block;

  margin-top: 15px;
  padding-left: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const UserImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 50px;
`;
/* object-fit: contain; */

const UserImgBox = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50px;
  margin-right: 10px;
`;
