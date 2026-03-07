import React from 'react';
import styled from 'styled-components';
import type ICompany from '../../models/ICompany';

interface CompanyModalProps {
  company: ICompany;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 4px;

  &:hover {
    color: #333;
  }
`;

const Field = styled.div`
  margin-bottom: 14px;
`;

const Label = styled.span`
  display: block;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const Value = styled.span`
  display: block;
  font-size: 15px;
  color: #333;
`;

const CompanyModal: React.FC<CompanyModalProps> = ({ company, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{company.name}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Fechar">&times;</CloseButton>
        </ModalHeader>
        <Field>
          <Label>CNPJ</Label>
          <Value>{company.cnpj}</Value>
        </Field>
        <Field>
          <Label>E-mail</Label>
          <Value>{company.email}</Value>
        </Field>
        <Field>
          <Label>Telefone</Label>
          <Value>{company.phone}</Value>
        </Field>
        <Field>
          <Label>Endereço</Label>
          <Value>{company.address}</Value>
        </Field>
        <Field>
          <Label>Cidade / Estado</Label>
          <Value>
            {company.city} - {company.state}
          </Value>
        </Field>
        <Field>
          <Label>Data de Cadastro</Label>
          <Value>
            {new Date(company.createdAt).toLocaleDateString('pt-BR')}
          </Value>
        </Field>
      </Modal>
    </Overlay>
  );
};

export default CompanyModal;
