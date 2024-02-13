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
  title: string;
  description: string;
  postImgs: { id: string }[];
}

const PostItem: FC<PostItemProps> = ({
  isFirst,
  postImgs,
  title,
  description,
  rating,
}) => {
  return (
    <div
      className={`${styles.PostItem} ${isFirst ? styles["PostItem--first"] : ""}`}
    >
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
