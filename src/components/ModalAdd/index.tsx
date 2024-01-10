/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, theme } from "antd";
import Modal from "antd/es/modal/Modal";
import Title from "antd/es/typography/Title";
import { Dispatch, FunctionComponent, ReactNode } from "react";

interface ModalAddProps {
  open?: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}

const ModalAdd: FunctionComponent<ModalAddProps> = ({
  setOpen,
  open,
  children,
  title,
  onFinish,
  onFinishFailed,
}) => {
  const { token } = theme.useToken();

  return (
    <Modal
      open={open}
      title={<Title level={1}>{title} </Title>}
      onCancel={() => {
        setOpen(false);
      }}
      width={"fit-content"}
      footer={[]}
    >
      <Form
        name={title}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "fit-content", padding: "4px 12px" }}
      >
        {children}
        <div className="text-right mt-4">
          <Button
            key="back"
            onClick={() => {
              setOpen(false);
            }}
          >
            Back
          </Button>
          <Button
            htmlType="submit"
            key="submit"
            type="primary"
            style={{ background: token.colorPrimary, marginLeft: "16px" }}
          >
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
