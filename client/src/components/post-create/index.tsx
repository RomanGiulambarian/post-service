import { FC, FormEvent, memo } from "react";
import ModalLayout from "../modal-layout";

interface PostCreateProps {
  closeModal: () => void;
}

const PostCreate: FC<PostCreateProps> = ({ closeModal }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (value.trim()) {
    //   props.onSubmit(value);
    //   setValue("");
    //   props.onClickOnCancelBtn();
    // } else {
    //   alert("Пустой комментарий, введите текст");
    // }
  };
  return (
    <ModalLayout onClose={closeModal} title="Создание поста">
      <form onSubmit={handleSubmit}></form>
    </ModalLayout>
  );
};

export default PostCreate;
