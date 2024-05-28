import { useContext } from 'react';
import { AppContext } from './AppContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Layout = ({ children }) => {
  const handleLogoutUser = useContext(AppContext).handleLogoutUser;
  const currentUser = useContext(AppContext).currentUser;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tanks Wiki
          </Typography>
          <div style={{display:"flex", gap:14} }>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentUser.username + "  |  " +  currentUser.role}</Typography>
          <Button color="inherit" onClick={handleLogoutUser}>Logout</Button>
          </div>
          {/* Add other header elements like navigation links */}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
