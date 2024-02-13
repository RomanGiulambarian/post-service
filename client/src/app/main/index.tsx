import { FC, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import IndentBox from "../../components/indent-box";
import SearchField from "../../components/search-field";
import PostList from "../../components/post-list";
import { useAppDispatch, useTypedSelector } from "../../store/store";
import { fetchPosts } from "../../store/post-list/actions";
import Button from "../../components/ui/button/button";
import PostCreate from "../../components/post-create";
import { open, close } from "../../store/modal/slice";

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { posts } = useTypedSelector((state) => state.postList);
  const { modalName } = useTypedSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const callbacks = {
    openModalCreatePost: useCallback(() => {
      dispatch(open("createPost"));
    }, [dispatch]),
    closeModal: useCallback(() => {
      dispatch(close());
    }, [dispatch]),
  };

  console.log(modalName);
  console.log("рендер");
  return (
    <>
      <PageLayout>
        <IndentBox marginBottom="large">
          <Head
            title="Блог"
            description="Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи"
          />
        </IndentBox>
        {/* <IndentBox marginBottom="large">
        <SearchField placeholder="Поиск по названию статьи" value="" />
      </IndentBox> */}
        <IndentBox marginBottom="medium">
          <Button onClick={callbacks.openModalCreatePost}>Создать пост</Button>
        </IndentBox>
        <PostList rating={{ like: 2, dislike: 3 }} postList={posts} />
      </PageLayout>

      {modalName === "createPost" && (
        <PostCreate closeModal={callbacks.closeModal} />
      )}
    </>
  );
};

export default Main;
