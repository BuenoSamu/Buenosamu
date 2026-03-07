import React, { useCallback, useState, useEffect } from 'react';
import ICompany from '../../models/ICompany';
import Company from '../../components/Company';
import CompanyModal from '../../components/CompanyModal';
import { useSidebar } from '../../hooks/sidebar';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search';
import { useCompany } from '../../hooks/company';
import { PageNames } from '../../enums/pages';
import Lottie from 'lottie-react';
import Carregando from '../../assets/animations/Carregando.json';

import {
  Container,
  Content,
  Header,
  PageName,
  ButtonSearchContainer,
  Main,
  LoadingContainer,
  EmptyMessage,
} from './styles';

const ManageCustomerPage: React.FC = () => {
  const { selectedPage, setSelectedPage } = useSidebar();
  const {
    getCompanies,
    chooseCompany,
    company,
    loading,
    pagination,
    setCurrentPage,
    companies,
  } = useCompany();

  const [searchCriteria, setSearchCriteria] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    setSelectedPage(PageNames.MANAGE_CUSTOMERS);
    getCompanies(1);
  }, [setSelectedPage, getCompanies]);

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchCriteria(value);
      getCompanies(1, value);
    },
    [getCompanies],
  );

  const handleChooseCompany = useCallback(
    (selected: ICompany) => {
      chooseCompany(selected);
      setIsModalVisible(true);
    },
    [chooseCompany],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  return (
    <Container>
      <Content>
        <Header>
          <PageName>{selectedPage}</PageName>
          <ButtonSearchContainer>
            <Search
              value={searchCriteria}
              onChange={handleSearch}
              placeholder="Pesquisar empresa..."
            />
          </ButtonSearchContainer>
        </Header>

        <Main>
          {loading ? (
            <LoadingContainer>
              <Lottie
                animationData={Carregando}
                style={{ width: 120, height: 120 }}
                loop
              />
            </LoadingContainer>
          ) : filteredCompanies.length === 0 ? (
            <EmptyMessage>Nenhuma empresa encontrada.</EmptyMessage>
          ) : (
            filteredCompanies.map((c) => (
              <Company
                key={c.id}
                company={c}
                onClick={handleChooseCompany}
              />
            ))
          )}
        </Main>

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </Content>

      {isModalVisible && company && (
        <CompanyModal company={company} onClose={handleCloseModal} />
      )}
    </Container>
  );
};

export default ManageCustomerPage;
