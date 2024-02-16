import { FC, FormEvent, memo, useState } from "react";
import ModalLayout from "../modal-layout";
import PostForm from "../post-form";
import { PostResBody } from "../../api/post-service/interface";

interface PostCreateProps {
  closeModal: () => void;
  createPost: (postParams: PostResBody) => void;
}

const PostCreate: FC<PostCreateProps> = ({ closeModal, createPost }) => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [fileValue, setFileValue] = useState<FileList | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleValue.trim()) {
      const formData = new FormData();

      if (fileValue) {
        for (let i = 0; i < fileValue.length; i++) {
          formData.append("images[]", fileValue[i]);
        }
      }

      createPost({
        title: titleValue,
        description: descriptionValue,
        formData: formData,
      });
      closeModal();
    } else {
      alert("Пустой заголовок, введите текст");
    }
  };
  return (
    <ModalLayout onClose={closeModal} title="Создание поста">
      <PostForm
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        descriptionValue={descriptionValue}
        setDescriptionValue={setDescriptionValue}
        setFileValue={setFileValue}
        handleSubmit={handleSubmit}
        textBtn="Создать"
      />
    </ModalLayout>
  );
};

export default memo(PostCreate);
