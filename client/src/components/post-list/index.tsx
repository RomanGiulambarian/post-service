import { FC, memo } from "react";
import styles from "./PostList.module.scss";
import PostItem from "../post-item";
import { RatingProps } from "../rating";
import { PostInitalState } from "../../store/post-list/interface";

interface PostListProps extends RatingProps {
  postList: PostInitalState[];
}

const PostList: FC<PostListProps> = ({ rating, postList }) => {
  return (
    <div className={styles.PostList}>
      {postList.length > 0 && (
        <PostItem
          isFirst
          postImgs={postList[0].media}
          title={postList[0].title}
          description={postList[0].description}
          rating={rating}
        />
      )}
      <div className={styles.smallPost__wrapper}>
        {postList.slice(1).map((item) => (
          <PostItem
            postImgs={item.media}
            title={item.title}
            description={item.description}
            rating={rating}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PostList);
