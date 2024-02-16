import { FC, FormEvent, useState } from "react";
import ModalLayout from "../modal-layout";
import PostForm from "../post-form";
import { UpdateThunkArg } from "../../store/post-list/interface";
import { ItemIdAndMediaArg } from "../../app/main";

interface PostUpdateProps {
  closeModal: () => void;
  itemIdAndMedia: ItemIdAndMediaArg;
  updatePost: ({}: UpdateThunkArg) => void;
}

const PostUpdate: FC<PostUpdateProps> = ({
  closeModal,
  itemIdAndMedia,
  updatePost,
}) => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [fileValue, setFileValue] = useState<FileList | null>(null);
  const [mediaToDelete, setMediaToDelete] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleValue.trim()) {
      const formData = new FormData();

      if (fileValue) {
        for (let i = 0; i < fileValue.length; i++) {
          formData.append("mediaToAdd[]", fileValue[i]);
        }
      }

      updatePost({
        id: itemIdAndMedia.id,
        title: titleValue,
        description: descriptionValue,
        formData: formData,
        mediaToDelete,
      });
      closeModal();
    } else {
      alert("Заголовок пустой");
    }
  };

  const handleClickOnDeleteImgBtn = (id: string) => {
    const newSelectedImgIds = mediaToDelete.includes(id)
      ? mediaToDelete.filter((selectedId) => selectedId !== id)
      : [...mediaToDelete, id];
    setMediaToDelete(newSelectedImgIds);
  };

  return (
    <ModalLayout onClose={closeModal} title="Обновить пост">
      <PostForm
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        descriptionValue={descriptionValue}
        setDescriptionValue={setDescriptionValue}
        setFileValue={setFileValue}
        handleSubmit={handleSubmit}
        textBtn="Обновить"
        media={itemIdAndMedia.media}
        mediaToDelete={mediaToDelete}
        handleClickOnDeleteImgBtn={handleClickOnDeleteImgBtn}
      />
    </ModalLayout>
  );
};

export default PostUpdate;
