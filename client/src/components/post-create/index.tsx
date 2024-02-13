import { FC, memo } from "react";
import ModalLayout from "../modal-layout";

interface PostCreateProps {
  closeModal: () => void;
}

const PostCreate: FC<PostCreateProps> = ({ closeModal }) => {
  console.log("1");
  return (
    <ModalLayout onClose={closeModal}>
      <div>321</div>
    </ModalLayout>
  );
};

export default PostCreate;
