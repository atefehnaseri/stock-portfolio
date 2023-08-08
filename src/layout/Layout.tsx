import React, {FC} from 'react'
import Container from '@mui/material/Container'
import {styled} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MuiBox, {BoxProps as MuiBoxProps} from '@mui/material/Box';
import {Typography} from '@mui/material';
import {Link, Outlet} from 'react-router-dom';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Header = styled(MuiAppBar)<MuiAppBarProps>(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(3, 2)
  })
);

const Footer = styled(MuiBox)<MuiBoxProps>(({theme}) => ({
  color: theme.palette.text.secondary,
  width: '100%',
  padding: theme.spacing(2, 2),
  variant: 'body2',
  textAlign: 'center',
}));


const LayoutWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
});

interface ILayoutProps {
  children?: string | JSX.Element | JSX.Element[]
}

const Layout: FC<ILayoutProps> = ({children}) => {
  return (
    <LayoutWrapper>
      <Header>
        <QueryStatsIcon sx={{mr: 2}}/>
        <Typography variant="h6" noWrap>
          SDH Frontend Homework Task
        </Typography>
      </Header>
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
      <Footer>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" to="#">
            Stock Portfolio
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Footer>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet/>
    </LayoutWrapper>
  )
}
export default Layout
