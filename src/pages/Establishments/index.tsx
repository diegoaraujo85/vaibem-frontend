import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import Header from '../../components/Header';
import { MyModal } from '../../components/NewEstablishmentModal';
import api from '../../services/api';
import { Content } from './styles';

interface Establishments {
  name: string;
  city: string;
  state: string;
}

const { confirm } = Modal;

const page = 'establishments';

const Establishments: React.FC = () => {
  const [dataSource, setDataSource] = useState<Establishments[]>([]);
  const [tempDataSource, setTempDataSource] = useState<Establishments[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const history = useHistory();

  const navigate = useCallback(
    (to) => {
      history.push(to);
    },
    [history]
  );

  // const handleAddNew = useCallback(() => { history.push(`/${page}/add`);}, [history]);

  const loadData = useCallback(() => {
    api.get(page).then((response) => {
      const { data } = response;
      data.map((item: any) => {
        const newItem = Object.assign(item, { key: item.id });
        return newItem;
      });

      setDataSource(data);
      setTempDataSource(data);
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
        title: 'Estabelecimento',
        dataIndex: 'name',
        key: 'name',
        // render: ()=>(),
      },
      {
        title: 'Cidade',
        dataIndex: 'city',
        key: 'city',
        // render: ()=>(),
      },
      {
        title: 'Estado',
        dataIndex: 'state',
        key: 'state',
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


  const ApplyFilter = useCallback(
    (text: string) => {

      const textToSearch = text.toLocaleUpperCase();

      const filteredItems = dataSource.filter(establishment => {
        if (
          (establishment.name &&
            establishment.name.toLocaleUpperCase().search(textToSearch) >= 0) ||
          (establishment.city &&
            establishment.city.toLocaleUpperCase().search(textToSearch) >= 0) ||
          (establishment.state &&
            establishment.state.toLocaleUpperCase().search(textToSearch) >= 0)

        ) {
          return establishment;
        }
      });

      setTempDataSource(filteredItems);
    },
    [dataSource],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>

          <Space direction="vertical">
            <Button
              type="primary"
              // onClick={() => handleAddNew()}
              onClick={() => setModalIsOpen(true)}
            >
              Novo registro
            </Button>

            <Input
              onChange={(e) => ApplyFilter(e.target.value)}
              placeholder="Pesquisar"
            />

            <Table columns={columns} dataSource={tempDataSource} />
          </Space>

          <MyModal closeModal={() => setModalIsOpen(false)} modalIsOpen={modalIsOpen}>

          </MyModal>
        </Content>
      </Container>
    </>
  );
};

export default Establishments;
