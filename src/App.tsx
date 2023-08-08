import React from 'react';
import Layout from "./layout";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Routes, Route} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress';

const CompanyDetails = React.lazy(() => import("./pages/CompanyDetails"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const defaultTheme = createTheme();
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={
              <React.Suspense fallback={<CircularProgress />}>
              <Dashboard/>
              </React.Suspense>
            }>
              <Route path="*" errorElement={<NotFoundPage/>}/>
            </Route>
            <Route path="companyDetails/:companySymbol" element={
              <React.Suspense fallback={<CircularProgress />}>
                <CompanyDetails/>
              </React.Suspense>
            }/>
          </Routes>
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
