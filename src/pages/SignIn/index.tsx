import { Alert, Button, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import logoImg from '../../assets/logo.color.png';
import { useAuth } from '../../hooks/auth';
import { Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  const { signIn } = useAuth();

  const onFinish = async (data: SignInFormData): Promise<void> => {

    try {
      setLoading(true);

      const { email, password } = data;
      await signIn({
        email,
        password,
      });

      setLoading(false);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
    setError(true);
    setLoading(false);

    history.push(`/signin`);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" height="25%" />

        <Form
          form={form}
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1>Faça seu logon</h1>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Insira o email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Insira a senha!' }]}
          >
            <Input.Password
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Space>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Enviar
              </Button>
            </Form.Item>
          </Space>

          {error && <Alert message="Erro na autenticação" type="error" />}
        </Form>



      </Content>
    </Container>
  );
};

export default SignIn;
