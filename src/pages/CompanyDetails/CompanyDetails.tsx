import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useQuery} from "@tanstack/react-query";
import {companyOverview} from "../../services";
import {useParams} from "react-router-dom";
import {API_KEY} from "../../constants";
import {ICompanyOverview} from "../../types/interfaces/companyOverview.interface";
import {formatNumber} from "../../utils";
import theme from "../../theme";


export default function CompanyDetails() {
  const {companySymbol} = useParams();
  const companyOverviewQueryParams = {
    "function": "OVERVIEW",
    "keywords": companySymbol,
    "apikey": API_KEY,
  };
  const {data, isLoading} = useQuery(['companyOverview', companySymbol],
    () => companyOverview(companyOverviewQueryParams), {
      enabled: !!companySymbol,
      retry: 1
    },
  );
  // using mock data due to issue with API call from the website
  const mockedData:ICompanyOverview= {
    "Symbol": "IBM",
    "AssetType": "Common Stock",
    "Name": "International Business Machines",
    "Description": "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
    "CIK": "51143",
    "Exchange": "NYSE",
    "Currency": "USD",
    "Country": "USA",
    "Sector": "TECHNOLOGY",
    "Industry": "COMPUTER & OFFICE EQUIPMENT",
    "Address": "1 NEW ORCHARD ROAD, ARMONK, NY, US",
    "FiscalYearEnd": "December",
    "LatestQuarter": "2023-06-30",
    "MarketCapitalization": "131403514000",
    "EBITDA": "12985000000",
    "PERatio": "61.12",
    "PEGRatio": "1.276",
    "BookValue": "24.37",
    "DividendPerShare": "6.61",
    "DividendYield": "0.046",
    "EPS": "2.36",
    "RevenuePerShareTTM": "66.75",
    "ProfitMargin": "0.0335",
    "OperatingMarginTTM": "0.141",
    "ReturnOnAssetsTTM": "0.0411",
    "ReturnOnEquityTTM": "0.104",
    "RevenueTTM": "60524999000",
    "GrossProfitTTM": "32688000000",
    "DilutedEPSTTM": "2.36",
    "QuarterlyEarningsGrowthYOY": "0.126",
    "QuarterlyRevenueGrowthYOY": "-0.004",
    "AnalystTargetPrice": "130.37",
    "TrailingPE": "61.12",
    "ForwardPE": "15.55",
    "PriceToSalesRatioTTM": "2.108",
    "PriceToBookRatio": "6.75",
    "EVToRevenue": "2.969",
    "EVToEBITDA": "25.81",
    "Beta": "0.855",
    "52WeekHigh": "149.31",
    "52WeekLow": "111.29",
    "50DayMovingAverage": "135.23",
    "200DayMovingAverage": "134.83",
    "SharesOutstanding": "911006000",
    "DividendDate": "2023-09-09",
    "ExDividendDate": "2023-08-09"
  };
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{padding: theme.spacing(4)}}
    >
      {mockedData ? (<><Typography variant="h5" gutterBottom>
        {mockedData.Name}
      </Typography>
        <Typography variant="h6" gutterBottom>
          Address: {mockedData.Address}
        </Typography>
        <Typography variant="h6" gutterBottom>
          MarketCapitalization: {formatNumber(mockedData.MarketCapitalization)}
        </Typography>
        <Divider/>
        <Typography variant="body1" gutterBottom>
          {mockedData.Description}
        </Typography></>) : null}
    </Grid>
  )
}

