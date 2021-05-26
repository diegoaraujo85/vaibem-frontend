import { Button, Modal, Space, Table } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import Header from '../../components/Header';
import api from '../../services/api';
import { Content } from './styles';

interface Users {
  id: string;
  name: string;
}

const { confirm } = Modal;

const page = 'users';

const Users: React.FC = () => {
  const [dataSource, setDataSource] = useState<Users[]>([]);


  const history = useHistory();

  const navigate = useCallback(
    (to) => {
      history.push(to);
    },
    [history]
  );

  const handleAddNew = useCallback(() => {
    history.push(`/${page}/add`);
  }, [history]);

  const loadData = useCallback(() => {
    api.get(page).then((response) => {
      const { data } = response;

      data.map((item: any) => {
        const newItem = Object.assign(item, { key: item.id });
        return newItem;
      });

      setDataSource(data);
    });
  }, [setDataSource]);

  const onDelete = useCallback((id) => {
    api.delete(`/${page}/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
          Modal.error({
            title: 'Erro',
            content: error.response.data.message,
          });
        }
      });
  }, []
  );





  const showConfirm = useCallback((id: string) => {
    confirm({
      title: 'Confirma deletar este registro?',
      icon: <ExclamationCircleOutlined />,
      content: 'Após ser deletado o registro não poderá ser recuperado novamente.',
      onOk() {
        onDelete(id);
      },
      onCancel() { },
    });
  }, [onDelete])

  const columns = useMemo(() => {
    const cols = [
      {
        title: 'Usuário',
        dataIndex: 'name',
        key: 'name',
        // render: ()=>(),
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        // render: ()=>(),
      },
      {
        title: 'Ação',
        key: 'action',
        render: (text: string, record: any) => (
          <Space size="middle">
            <Button
              onClick={(e) => {
                navigate(`/${page}/${record.id}`);
              }}
            >
              Editar
            </Button>
            <Button onClick={() => showConfirm(record.id)}>Deletar</Button>
          </Space>
        ),
      },
    ];

    return cols;
  }, [navigate, showConfirm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Header />
      <Container>
        <Content>

          <Space direction="vertical">
            <Button type="primary" onClick={() => handleAddNew()}>
              Novo registro
            </Button>
            <Table columns={columns} dataSource={dataSource} />
          </Space>
        </Content>
      </Container>
    </>
  );
};

export default Users;
