import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import Modal from 'react-modal';

import api from '../../services/api';

// import { Container } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

interface Props {
  modalIsOpen: boolean;
  children: any;
  closeModal: () => void;
}

interface FormData {
  name: string;
  city: string;
  state: string;
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const page = 'establishments';

export const MyModal: React.FC<Props> = ({ modalIsOpen, closeModal, children, ...rest }) => {
  const onFinish = async (values: FormData): Promise<void> => {
    const { name, city, state } = values;

    await api.post(page, {
      name,
      city,
      state
    });
    window.location.reload();
    // setModalIsOpen(false);
    // history.push(`/${page}`);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      {...rest}
    >
      <Form
        // {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Estabel."
          name="name"
          rules={[{ required: true, message: 'Insira o nome da Estabelecimento!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cidade"
          name="city"
          rules={[{ required: true, message: 'Insira o nome da Cidade!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="state"
          rules={[{ required: true, message: 'Insira o nome da Estado!' }]}
        >
          <Input />
        </Form.Item>

        <Space>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Salvar
              </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" danger onClick={closeModal}>
              Cancelar
              </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
}