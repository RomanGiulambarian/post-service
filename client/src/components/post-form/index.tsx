import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./PostForm.module.scss";
import Button from "../ui/button/button";
import Input from "../ui/input";
import TextArea from "../ui/textarea";

interface PostFormProps {
  titleValue: string;
  setTitleValue: (titleValue: string) => void;
  descriptionValue: string;
  setDescriptionValue: (descriptionValue: string) => void;
  setFileValue: (fileValue: FileList | null) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  textBtn: string;
  media?: { id: string }[];
  mediaToDelete?: string[];
  handleClickOnDeleteImgBtn?: (id: string) => void;
}

const PostForm: FC<PostFormProps> = ({
  titleValue,
  setTitleValue,
  descriptionValue,
  setDescriptionValue,
  setFileValue,
  handleSubmit,
  textBtn,
  media,
  mediaToDelete,
  handleClickOnDeleteImgBtn,
}) => {
  return (
    <form className={styles.PostForm} onSubmit={handleSubmit}>
      <Input
        label="Заголовок"
        type="text"
        value={titleValue}
        setValue={setTitleValue}
      />
      <TextArea
        label="Описание"
        value={descriptionValue}
        setValue={setDescriptionValue}
      />
      <div className={styles.footer}>
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFileValue(e.target.files)
          }
          multiple={true}
        />
        <Button>{textBtn}</Button>
      </div>

      {textBtn === "Обновить" && media && media.length > 0 && (
        <div className={styles.imgs__box}>
          {media.map((img) => (
            <div key={img.id}>
              <svg
                className={styles.deleteImg__btn}
                onClick={() => {
                  if (handleClickOnDeleteImgBtn) {
                    handleClickOnDeleteImgBtn(img.id);
                  }
                }}
                width="24"
                height="24"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={
                    mediaToDelete?.includes(img.id) ? styles.selectedImg : ""
                  }
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
                  fill="#d44242"
                ></path>
              </svg>
              <img
                className={styles.img}
                src={`http://localhost:8080/static/${img.id}.jpg`}
              />
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default PostForm;
