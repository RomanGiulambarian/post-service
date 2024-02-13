import { FC, memo } from "react";
import styles from "./PostItem.module.scss";
import Rating, { RatingProps } from "../rating";
import Button from "../ui/button/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import noPhotoImg from "../../assets/img/nophoto.jpg";
import { Navigation } from "swiper/modules";

interface PostItemProps extends RatingProps {
  isFirst?: boolean;
  id: string;
  title: string;
  description: string;
  postImgs: { id: string }[];
  onDelete: (id: string) => void;
}

const PostItem: FC<PostItemProps> = ({
  isFirst,
  id,
  postImgs,
  title,
  description,
  rating,
  onDelete,
}) => {
  return (
    <div
      className={`${styles.PostItem} ${isFirst ? styles["PostItem--first"] : ""}`}
    >
      <svg
        className={styles.deleteBtn}
        onClick={() => onDelete(id)}
        width="24"
        height="24"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
          fill="#d44242"
        ></path>
      </svg>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {postImgs.length > 0 ? (
          postImgs.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                className={`${styles.PostItem__img} ${isFirst ? styles["PostItem__img--first"] : ""}`}
                src={`http://localhost:8080/static/${img.id}.jpg`}
              />
            </SwiperSlide>
          ))
        ) : (
          <img
            className={`${styles.PostItem__img} ${isFirst ? styles["PostItem__img--first"] : ""}`}
            src={noPhotoImg}
          />
        )}
      </Swiper>
      <div
        className={`${styles.PostItem__footer} ${!isFirst ? styles["PostItem__footer--first"] : ""}`}
      >
        <div className={styles.title}>
          <h2>{title}</h2>
          {isFirst && <Rating rating={rating} />}
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.btns__box}>
          {!isFirst && <Rating rating={rating} />}
          <Button>Обновить пост</Button>
        </div>
      </div>
    </div>
  );
};

export default memo(PostItem);
