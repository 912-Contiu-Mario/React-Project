import { useContext } from 'react';
import { AppContext } from './AppContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Layout = ({ children }) => {
  const handleLogoutUser = useContext(AppContext).handleLogoutUser;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tanks Wiki
          </Typography>
          <Button color="inherit" onClick={handleLogoutUser}>Logout</Button>
          {/* Add other header elements like navigation links */}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
