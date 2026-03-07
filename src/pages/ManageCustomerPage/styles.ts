import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f4f6fb;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const PageName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #222;
  margin: 0;
`;

export const ButtonSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Main = styled.div`
  flex: 1;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 15px;
  margin-top: 48px;
`;
