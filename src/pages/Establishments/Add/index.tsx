import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

import Header from '../../../components/Header';
import api from '../../../services/api';
import { Content } from './styles';

interface FormData {
  name: string;
  city: string;
  state: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const page = 'establishments';

const Establishments: React.FC = () => {
  const history = useHistory();

  const onFinish = async (values: FormData): Promise<void> => {
    const { name, city, state } = values;

    await api.post(page, {
      name,
      city,
      state
    });

    history.push(`/${page}`);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form
            {...layout}
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
                <Button type="primary" danger onClick={() => history.push(`/${page}`)}>
                  Cancelar
              </Button>
              </Form.Item>
            </Space>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Establishments;
