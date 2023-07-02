import React from "react";
// import { useNavigate } from "react-router-dom";
import {updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import {doc, getDoc} from "firebase/firestore";
import {useParams} from "react-router-dom";
import uuid from "react-uuid";
import * as Styled from "./Detail.styles";

function ShowDetail() {
  // const navigate = useNavigate();
  const params = useParams(); //-> /뒤에 있는 정보(디테일에 대한 정보)를 가져다 쓰기 위해서 파람스 사용

  // console.log(params);
  const [content, setContent] = useState(null);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // contents컬렉션에서 해당 게시물 정보 가져옴
      const snapContent = await getDoc(doc(db, "contents", params.id));
      console.log(snapContent);
      if (snapContent.exists()) {
        console.log(snapContent.data());
        setContent(snapContent.data());
      } else {
        console.log("No such document");
      }
      // users 컬렉션 정보 가져옴
      // const snapUser = await getDoc(doc(db, "users", auth.currentUser.uid));

      // if (snapUser.exists()) {
      //   console.log(snapUser.data());
      //   setUser(snapUser.data());
      // } else {
      //   console.log("No such document");
      // }
    };

    fetchData();
  }, []);

  // 댓글
  const [text, setText] = useState("");
  const onChange = (event) => {
    const {
      target: {name, value},
    } = event;
    if (name === "text") {
      setText(value);
    }
  };

  // 댓글 추가
  const addComment = async (event) => {
    event.preventDefault();

    const comments = [...content.comments, text];
    const newContent = {...content, comments};
    setText("");
    setContent(newContent); //-->페이지에서 보여지는 부분 업데이트
    //contents 컬렉션에서 문서 id에 해당하는 contentRef
    const contentRef = doc(db, "contents", params.id);

    await updateDoc(contentRef, newContent); //-->데이터베이스 업데이트
  };

  return (
    <Styled.Layout>
      {/* <Backbutton
        onClick={() => {
          navigate("/");
        }}
      >
        BACK
      </Backbutton> */}
      <Styled.Container>
        {/* 컨텐츠가 null이 아닐때 */}
        {content && (
          <>
            <Styled.PhotoBox>
              <Styled.PhotoImg src={content.imgUrl} />
            </Styled.PhotoBox>

            <Styled.TextBox>
              <Styled.SmallTextBox>
                <Styled.UserBox>
                  <Styled.UserImgBox>
                    <Styled.UserImg src={content.userImgUrl} />
                  </Styled.UserImgBox>

                  <h1>{content.userNickname}</h1>
                </Styled.UserBox>
                <Styled.ContentTitle>{content.title}</Styled.ContentTitle>
                <Styled.ContentDesc>{content.desc}</Styled.ContentDesc>
              </Styled.SmallTextBox>
              <Styled.ListBox>
                <Styled.H1>COMMENT ▼</Styled.H1>
                <Styled.CommentListBox>
                  {content.comments.map(function (comment) {
                    // console.log(comment.id);
                    return (
                      <Styled.CommentBox key={uuid()}>
                        <Styled.Comment>{comment}</Styled.Comment>
                      </Styled.CommentBox>
                    );
                  })}
                </Styled.CommentListBox>

                <div>
                  <Styled.ListBoxForm onSubmit={addComment}>
                    <Styled.FormInput type="text" placeholder="leave comment" value={text} name="text" onChange={onChange} required></Styled.FormInput>
                  </Styled.ListBoxForm>
                </div>
              </Styled.ListBox>
            </Styled.TextBox>
          </>
        )}
      </Styled.Container>
    </Styled.Layout>
  );
}
export default ShowDetail;
