import React, { useState } from 'react';
import { Box, Stack, Drawer, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import DeliveryForm from './DeliveryForm';
import MapView from './MapView';
import MapViewCss from './AlignMap.module.css';
import Footer from './Footer';
import DashboardSidebar from './DashboardSidebar';
import PopupHome from './PopupHome';

function Overlay({ open, onClick }) {
  return open ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '0%',
        height: '0%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: 0,
      }}
      onClick={onClick}
    />
  ) : null;
}

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openHome, setOpenHome] = useState(false);

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleToggleHome = () => {
    setOpenHome(!openHome);
  };

  const handleToggleBoth = () => {
    setOpenHome(!openHome);
    //setOpenSidebar(!openSidebar);
    
  };

  return (
    <Box className={MapViewCss.body} position="relative">
      <Stack direction="row-reverse" justifyContent="inherit">
        <DeliveryForm />
        <MapView />
        <IconButton
          onClick={handleToggleBoth}
          sx={{
            position: 'absolute',
            top: -10,
            right: 1245,
            zIndex: 1,
            height: 48,
            width: 48,
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
          color="primary"
          aria-label="toggle sidebar"
        >
          <Menu />
        </IconButton>
      </Stack>

      
      
      <Drawer anchor="right" open={openHome} onClose={handleToggleHome}>
        <PopupHome handleToggle={handleToggleBoth} />
      </Drawer>

      <Drawer anchor="left" open={openSidebar} onClose={handleToggleSidebar}>
        <DashboardSidebar onClose={handleToggleBoth}/>
      </Drawer>
      
      <Overlay open={openHome} onClick={handleToggleHome} />
      {/* <Footer /> */}
    </Box>
  );
}

export default App;
