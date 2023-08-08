import React from "react";
import {styled} from '@mui/system';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MuiAlert, {AlertProps as MuiAlertProps}  from '@mui/material/Alert';
import {ICompanyTransformed} from "../../types/interfaces/company.interface";
import DeleteIcon from '@mui/icons-material/Delete'
import {Link} from "react-router-dom";


const EmptyPortfolioList = styled(MuiAlert)<MuiAlertProps>({
  color: 'info',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
});

interface IPortfolioTableProps {
  portfolioList: ICompanyTransformed[];
  handleRemoveCompany: (companySymbol: string) => void;
}

const PortfolioTable: React.FC<IPortfolioTableProps> = ({portfolioList, handleRemoveCompany}) => {

  return (
    <>
      {portfolioList.length> 0 ? (<TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolioList?.map((company: any) => (
                <TableRow key={company.symbol}>
                  <TableCell>
                    <Link to={`companyDetails/${company.symbol}`}>{company.name}</Link>
                  </TableCell>
                  <TableCell>{company.symbol}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleRemoveCompany(company.symbol)}
                    >
                      Remove
                      <DeleteIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <EmptyPortfolioList severity="info">
          Your portfolio is empty. Let&apos;s begin to search and add some!
        </EmptyPortfolioList>
        )
      }
    </>
  );
};

export default PortfolioTable;