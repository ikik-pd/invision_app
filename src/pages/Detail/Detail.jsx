import React from 'react';
// import { useNavigate } from "react-router-dom";
import { updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import * as Styled from './Detail.styles';
import { styled } from 'styled-components';
import myImage from '../Detail/60969.png';
import Header from '../../components/Header';
import { useNavigate, Link } from 'react-router-dom';
import left_icon from '../../assets/img/left_icon.png';
import { LeftBtn } from '../Detail/Detail.styles';
import { signInWithEmailAndPassword } from 'firebase/auth';

function ShowDetail() {
  const params = useParams(); //-> /뒤에 있는 정보(디테일에 대한 정보)를 가져다 쓰기 위해서 파람스 사용
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);

  // 수정&삭제 버튼 모음
  const [drawer, setDrawer] = useState(false);
  const drawerHandler = () => {
    setDrawer(true);
  };

  // 삭제
  const delPost = async (id) => {
    try {
      const forReal = window.confirm('삭제할까요?');
      if (!forReal) return false;

      const delContents = await getDoc(doc(db, 'contents', params.id));
      const user = auth.currentUser.uid;
      if (delContents.exists()) {
        if (user === delContents.data().uid) {
          alert('삭제 완료');
        } else {
          // 본인이 작성하지 않았을 때 알럿창이 안뜸
          window.alert('로그인해 주세요.');
        }
        setContent(delContents.data());
      }

      const postDel = doc(db, 'contents', id);
      await deleteDoc(postDel);
      navigate('/');
    } catch (error) {
      window.alert('로그인해 주세요.');
    }
  };

  // 수정
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // contents컬렉션에서 해당 게시물 정보 가져옴
      const snapContent = await getDoc(doc(db, 'contents', params.id));
      console.log(snapContent);
      if (snapContent.exists()) {
        console.log(snapContent.data());
        setContent(snapContent.data());
      } else {
        console.log('No such document');
      }
      // users 컬렉션 정보 가져옴

      // const snapUser = await getDoc(doc(db, 'users', auth.currentUser.uid));

      // if (snapUser.exists()) {
      //   console.log(snapUser.data());
      //   setUser(snapUser.data());
      // } else {
      //   console.log('No such document');
      // }
    };

    fetchData();
  }, []);

  // 댓글

  const [comment, setComment] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'comment') {
      setComment(value);
    }
    console.log(comment);
  };

  // 댓글 추가
  const addComment = async (event) => {
    event.preventDefault();

    const comments = [...content.comments, comment];
    const newContent = { ...content, comments };
    setComment('');

    setContent(newContent); //-->페이지에서 보여지는 부분 업데이트
    //contents 컬렉션에서 문서 id에 해당하는 contentRef
    const contentRef = doc(db, 'contents', params.id);

    await updateDoc(contentRef, newContent); //-->데이터베이스 업데이트
  };

  console.log('content : ', params.id.userImg);

  return (
    <>
      <Header />
      <Styled.Layout>
        <Link to={'/'}>
          <LeftBtn src={left_icon} alt="뒤로가기" />
        </Link>
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
                    <div
                      styled={{
                        // display: "flex",
                        border: '1px solid black',
                        width: '200px'
                      }}
                    >
                      <Styled.UserImgBox>
                        <Styled.UserImg src={content.userImg} />
                      </Styled.UserImgBox>
                      <div>{content.userNickname}</div>
                    </div>
                    <Styled.DrawerFunction>
                      <Styled.DotsWrapper onClick={drawerHandler} onBlur={() => setDrawer(false)}>
                        <img style={{ width: '20px', height: '20px' }} src={myImage} alt="My" />
                      </Styled.DotsWrapper>
                      {drawer && (
                        <Styled.Cruds>
                          <Styled.Crud
                            onMouseDown={() => {
                              navigate(`/update/${params.id}`);
                            }}
                          >
                            수정
                          </Styled.Crud>
                          <Styled.Crud onMouseDown={() => delPost(params.id)}>삭제</Styled.Crud>
                        </Styled.Cruds>
                      )}
                    </Styled.DrawerFunction>
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
                      {/* <Styled.FormInput
                        type="text"
                        placeholder="leave commenter"
                        value={commenter}
                        name="commenter"
                        onChange={onChangeCommenter}
                        required
                      ></Styled.FormInput> */}
                      <Styled.FormInput
                        type="text"
                        placeholder="leave comment"
                        value={comment}
                        name="comment"
                        onChange={onChange}
                        required
                      ></Styled.FormInput>
                    </Styled.ListBoxForm>
                  </div>
                </Styled.ListBox>
              </Styled.TextBox>
            </>
          )}
        </Styled.Container>
      </Styled.Layout>
    </>
  );
}
export default ShowDetail;
