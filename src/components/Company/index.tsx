import React from 'react';
import styled from 'styled-components';
import type ICompany from '../../models/ICompany';

interface CompanyProps {
  company: ICompany;
  onClick: (company: ICompany) => void;
}

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Detail = styled.span`
  font-size: 13px;
  color: #777;
`;

const Company: React.FC<CompanyProps> = ({ company, onClick }) => {
  return (
    <Card onClick={() => onClick(company)}>
      <Info>
        <Name>{company.name}</Name>
        <Detail>{company.cnpj}</Detail>
        <Detail>{company.email}</Detail>
      </Info>
      <Info style={{ textAlign: 'right' }}>
        <Detail>{company.phone}</Detail>
        <Detail>
          {company.city} - {company.state}
        </Detail>
      </Info>
    </Card>
  );
};

export default Company;
