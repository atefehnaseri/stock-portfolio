import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PortfolioTable from "../../components/PortfolioTable/PortfolioTable";
import {ICompanyTransformed} from "../../types/interfaces/company.interface";
import {useState} from "react";
import AutocompleteSearchInput from "../../components/AutocompleteSearchInput";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Dashboard() {


  const [portfolioList, setPortfolioList] = useState<ICompanyTransformed[]>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);


  const handleAddCompany = (company: any) => {
    setPortfolioList((portfolioList) => [...portfolioList, company]);
    setOpenToast(true);
  };
  const handleRemoveCompany = (companySymbol: string) => {
    setPortfolioList((prevPortfolio) =>
      prevPortfolio.filter((company) => company.symbol !== companySymbol)
    );
  };

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
          <Grid container spacing={3}>
            {/* Search */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 440,
                }}
              >
                <AutocompleteSearchInput onAdd={handleAddCompany}/>
              </Paper>
            </Grid>
            {/* Portfolio Table*/}
            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: 440}}>
                <PortfolioTable portfolioList={portfolioList} handleRemoveCompany={handleRemoveCompany}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Snackbar open={openToast} autoHideDuration={2000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          New Portfolio Added!
        </Alert>
      </Snackbar>
    </Box>
  );
}