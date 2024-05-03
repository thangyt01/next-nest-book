import { Button, Modal, ModalProps } from "antd";
import { FC } from "react";

type ButtonActiveModalProps = {
  // Add props here
  title: string;
  children: React.ReactNode;
  buttonText: string;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  buttonDanger?: boolean;
  isModalOpen: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: () => void;
  hiddenModal: () => void;
} & ModalProps;

const ButtonActiveModal: FC<ButtonActiveModalProps> = (props) => {
  const {
    isModalOpen,
    buttonText,
    title,
    children,
    showModal,
    hiddenModal,
    buttonDanger,
    buttonType = "primary",
  } = props;

  return (
    <div>
      <Button type={buttonType} onClick={showModal} danger={buttonDanger}>
        {buttonText}
      </Button>
      <Modal
        {...props}
        title={title}
        open={isModalOpen}
        onOk={hiddenModal}
        onCancel={hiddenModal}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ButtonActiveModal;
