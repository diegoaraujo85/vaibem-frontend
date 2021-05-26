import { Button, Form, Input, Space } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router';

import Header from '../../../components/Header';
import api from '../../../services/api';
import { Content } from './styles';

interface Params {
  id: string;
}

interface FormData {
  name: string;
  email: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const page = 'users';

const UsersEdit: React.FC = () => {
  const { params } = useRouteMatch<Params>();

  const { id } = params;

  const [form] = Form.useForm();

  const history = useHistory();

  const loadData = useCallback(() => {
    api.get<FormData>(`/${page}/${id}`).then((response) => {
      const { data } = response;

      form.setFieldsValue(data);
    });
  }, [id, form]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onFinish = async (values: FormData): Promise<void> => {
    const { name, email } = values;

    await api.put(`/${page}/${id}`, {
      name,
      email
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
            form={form}
            {...layout}
            name="basic"
            // initialValues={{ name: initialData.name }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Usuário"
              name="name"
              rules={[{ required: true, message: 'Insira o nome do Usuário!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'Insira o nome do Usuário!' }]}
            >
              <Input disabled />
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

export default UsersEdit;
