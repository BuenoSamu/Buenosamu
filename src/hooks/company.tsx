import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';
import ICompany from '../models/ICompany';
import api from '../services/api';

interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

interface CompanyContextData {
  companies: ICompany[];
  company: ICompany | null;
  loading: boolean;
  pagination: IPagination;
  getCompanies: (page?: number, search?: string) => Promise<void>;
  chooseCompany: (company: ICompany) => void;
  setCurrentPage: (page: number) => void;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData,
);

const PER_PAGE = 10;

const MOCK_COMPANIES: ICompany[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `Empresa ${i + 1} Ltda`,
  cnpj: `${String(i + 1).padStart(2, '0')}.${String(i + 1).padStart(3, '0')}.${String(i + 1).padStart(3, '0')}/0001-${String(i + 1).padStart(2, '0')}`,
  email: `contato${i + 1}@empresa${i + 1}.com.br`,
  phone: `(11) 9${String(i + 1).padStart(4, '0')}-${String(i + 1).padStart(4, '0')}`,
  address: `Rua das Flores, ${100 + i}`,
  city: 'São Paulo',
  state: 'SP',
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [company, setCompany] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: PER_PAGE,
  });

  const getCompanies = useCallback(
    async (page = 1, search = '') => {
      setLoading(true);
      try {
        const response = await api.get('/companies', {
          params: { page, search, perPage: PER_PAGE },
        });
        setCompanies(response.data.companies);
        setPagination(response.data.pagination);
      } catch {
        const filtered = search
          ? MOCK_COMPANIES.filter(
              (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.cnpj.includes(search) ||
                c.email.toLowerCase().includes(search.toLowerCase()),
            )
          : MOCK_COMPANIES;

        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / PER_PAGE);
        const start = (page - 1) * PER_PAGE;
        const end = start + PER_PAGE;

        setCompanies(filtered.slice(start, end));
        setPagination({ currentPage: page, totalPages, totalItems, perPage: PER_PAGE });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const chooseCompany = useCallback((selected: ICompany) => {
    setCompany(selected);
  }, []);

  const setCurrentPage = useCallback(
    (page: number) => {
      getCompanies(page);
    },
    [getCompanies],
  );

  return (
    <CompanyContext.Provider
      value={{
        companies,
        company,
        loading,
        pagination,
        getCompanies,
        chooseCompany,
        setCurrentPage,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextData => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
