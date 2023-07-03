import React from 'react';
import { updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import * as Styled from './Detail.styles';
import myImage from '../Detail/60969.png';
import Header from '../../components/Header';
import { useNavigate, Link } from 'react-router-dom';
import left_icon from '../../assets/img/left_icon.png';
import { LeftBtn } from '../Detail/Detail.styles';

function ShowDetail() {
  const params = useParams();
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
      const forReal = window.confirm('삭제하시겠습니까?');
      if (!forReal) return false;

      const delContents = await getDoc(doc(db, 'contents', params.id));
      const user = auth.currentUser.uid;
      if (delContents.exists()) {
        if (user === delContents.data().uid) {
          alert('삭제가 완료되었습니다.');
        } else {
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

  useEffect(() => {
    const fetchData = async () => {
      const snapContent = await getDoc(doc(db, 'contents', params.id));
      console.log(snapContent);
      if (snapContent.exists()) {
        console.log(snapContent.data());
        setContent(snapContent.data());
      } else {
        console.log('No such document');
      }
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

    setContent(newContent);
    const contentRef = doc(db, 'contents', params.id);

    await updateDoc(contentRef, newContent);
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
          {content && (
            <>
              <Styled.PhotoBox>
                <Styled.PhotoImg src={content.imgUrl} />
              </Styled.PhotoBox>

              <Styled.TextBox>
                <Styled.SmallTextBox>
                  <Styled.UserBox>
                    <Styled.UserInfoBox>
                      <Styled.UserImgBox>
                        <Styled.UserImg src={content.userImg} />
                      </Styled.UserImgBox>
                      <div>{content.userNickname}</div>
                    </Styled.UserInfoBox>
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
                      return (
                        <Styled.CommentBox key={uuid()}>
                          <Styled.Comment>{comment}</Styled.Comment>
                        </Styled.CommentBox>
                      );
                    })}
                  </Styled.CommentListBox>

                  <div>
                    <Styled.ListBoxForm onSubmit={addComment}>
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
