import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BadgeIcon from '@mui/icons-material/Badge';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SummarizeIcon from '@mui/icons-material/Summarize';

const EmpDashboard = () => {


  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Employee Details', icon: <BadgeIcon /> },
          { text: 'Accepted Leave Requests', icon: <MarkEmailReadIcon /> },
          { text: 'Rejected Leave Requests', icon: <UnsubscribeIcon /> },
          { text: 'Employee attendance', icon: <EmojiPeopleIcon /> },
          { text: 'Payroll', icon: <SummarizeIcon /> }
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Employee Dashboard</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <hr/>
      <hr/>
      <hr/>

    </div>
  );
}

export default EmpDashboard;

