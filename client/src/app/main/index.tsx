import { FC, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import IndentBox from "../../components/indent-box";
import SearchField from "../../components/search-field";
import PostList from "../../components/post-list";
import { useAppDispatch, useTypedSelector } from "../../store/store";
import {
  createPost as create,
  fetchPosts,
  updatePost as update,
} from "../../store/post-list/actions";
import Button from "../../components/ui/button/button";
import PostCreate from "../../components/post-create";
import { open, close } from "../../store/modal/slice";
import { deletePost } from "../../store/post-item/actions";
import Loader from "../../components/ui/loader";
import { PostResBody } from "../../api/interface";
import { UpdateThunkArg } from "../../store/post-list/interface";
import PostUpdate from "../../components/post-update";

export interface ItemIdAndMediaArg {
  id: string;
  media: { id: string }[];
}

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useTypedSelector((state) => state.postList);
  const { modalName } = useTypedSelector((state) => state.modal);
  const [itemIdAndMedia, setItemIdAndMedia] = useState<ItemIdAndMediaArg>({
    id: "",
    media: [],
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const callbacks = {
    openModalCreatePost: useCallback(() => {
      dispatch(open("createPost"));
    }, [dispatch]),
    openModalUpdatePost: useCallback(() => {
      dispatch(open("updatePost"));
    }, [dispatch]),
    closeModal: useCallback(() => {
      dispatch(close());
    }, [dispatch]),
    deletePost: useCallback(
      (id: string) => {
        dispatch(deletePost(id));
      },
      [dispatch]
    ),
    createPost: useCallback(
      (postParams: PostResBody) => {
        dispatch(create(postParams));
      },
      [dispatch]
    ),
    updatePost: useCallback(
      (updateParams: UpdateThunkArg) => {
        dispatch(update(updateParams));
      },
      [dispatch]
    ),
  };

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
        {isLoading && <Loader />}
        <PostList
          rating={{ like: 2, dislike: 3 }}
          postList={posts}
          deletePost={callbacks.deletePost}
          openModalUpdatePost={callbacks.openModalUpdatePost}
          setItemIdAndMedia={setItemIdAndMedia}
        />
      </PageLayout>

      {modalName === "createPost" && (
        <PostCreate
          closeModal={callbacks.closeModal}
          createPost={callbacks.createPost}
        />
      )}

      {modalName === "updatePost" && (
        <PostUpdate
          closeModal={callbacks.closeModal}
          itemIdAndMedia={itemIdAndMedia}
          updatePost={callbacks.updatePost}
        />
      )}
    </>
  );
};

export default Main;
