import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${({ active }) => (active ? '#3068f2' : '#ddd')};
  background: ${({ active }) => (active ? '#3068f2' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: #3068f2;
    color: ${({ active }) => (active ? '#fff' : '#3068f2')};
  }
`;

const NavButton = styled.button`
  padding: 0 12px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: #3068f2;
    color: #3068f2;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = (): number[] => {
    const pages: number[] = [];
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (left > 1) {
      pages.unshift(-1, 1);
    }
    if (right < totalPages) {
      pages.push(-2, totalPages);
    }

    return pages;
  };

  return (
    <Container>
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Anterior
      </NavButton>
      {getPages().map((page, idx) =>
        page < 0 ? (
          <span key={`ellipsis-${idx}`}>…</span>
        ) : (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ),
      )}
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima &raquo;
      </NavButton>
    </Container>
  );
};

export default Pagination;
