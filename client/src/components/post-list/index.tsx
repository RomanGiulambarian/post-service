import { FC, memo } from "react";
import styles from "./PostList.module.scss";
import PostItem from "../post-item";
import { RatingProps } from "../rating";
import { Post, UpdateThunkArg } from "../../store/post-list/interface";
import PostUpdate from "../post-update";
import { ItemIdAndMediaArg } from "../../app/main";

interface PostListProps extends RatingProps {
  postList: Post[];
  deletePost: (id: string) => void;
  openModalUpdatePost: () => void;
  setItemIdAndMedia: (arg: ItemIdAndMediaArg) => void;
}

const PostList: FC<PostListProps> = ({
  rating,
  postList,
  deletePost,
  openModalUpdatePost,
  setItemIdAndMedia,
}) => {
  return (
    <div className={styles.PostList}>
      {postList.length > 0 && (
        <PostItem
          isFirst
          id={postList[0].id}
          postImgs={postList[0].media}
          title={postList[0].title}
          description={postList[0].description}
          rating={rating}
          onDelete={deletePost}
          openModalUpdatePost={openModalUpdatePost}
          setItemIdAndMedia={setItemIdAndMedia}
        />
      )}
      <div className={styles.smallPost__wrapper}>
        {postList
          .slice(1)
          ?.map((item) => (
            <PostItem
              id={item.id}
              postImgs={item.media}
              title={item.title}
              description={item.description}
              rating={rating}
              key={item.id}
              onDelete={deletePost}
              openModalUpdatePost={openModalUpdatePost}
              setItemIdAndMedia={setItemIdAndMedia}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(PostList);
