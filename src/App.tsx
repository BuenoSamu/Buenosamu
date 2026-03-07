import { SidebarProvider } from './hooks/sidebar';
import { CompanyProvider } from './hooks/company';
import ManageCustomerPage from './pages/ManageCustomerPage';

function App() {
  return (
    <SidebarProvider>
      <CompanyProvider>
        <ManageCustomerPage />
      </CompanyProvider>
    </SidebarProvider>
  );
}

export default App;
