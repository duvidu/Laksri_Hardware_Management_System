import { useEffect , useState} from "react"
import React from 'react';
import { createTheme } from '@mui/material/styles';
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
import MenuIcon from '@mui/icons-material/Menu';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';



import employeeCss from '../Components/Employee/employee.module.css'


import Navibar from "../Components/Employee/Navibar"
import EmployeeDetails from "../Components/Employee/EmployeeDetails"
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";






const EmployeeHome = () => {

    const [employees, setEmployees] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Employee Details' ,icon: <BadgeIcon />, link: '/employee' },
          { text: 'Accepted Leave Requests', icon: <MarkEmailReadIcon /> , link: '/acceptedLeaveRequests' },
          { text: 'Employee attendance', icon: <EmojiPeopleIcon /> , link: '/AttHome' },
          
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton  component={Link} to={item.link || '/'}>
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
 
   

    useEffect(() =>  {
        const fetchEmployees = async () => {
        const response = await fetch('http://localhost:8000/employees')
        const json = await response.json()
      

        if (response.ok){
            setEmployees(json)
        }
    }

    fetchEmployees()
}, []);


        // Function to handle search query changes
        const handleSearchInputChange = (e) => {
            setSearchQuery(e.target.value);
          };
          
    return (
        <div className={employeeCss.fullbody}>
          <Button  className={employeeCss.menuIC} onClick={toggleDrawer(true)}><MenuIcon/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
            <Navibar/>
            <div>
            <div >
                <div className={employeeCss.belowNav}>
                <div className={employeeCss.sear}><SearchIcon/></div>
        <IconButton size="large"  color="inherit" href="/addNewEmployee" className={employeeCss.addBtn}>
          <Badge  color="error">
          <AddBoxIcon/>
          </Badge>
        </IconButton></div>
            <div className={employeeCss.addNew}>Add New Employee</div>
            <div className={employeeCss.searches}>
            <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
              
                />
            </div>
            <div className={employeeCss.titles}>
                <ul>
                    <li className={employeeCss.empList}><strong>Employee id</strong></li>
                    <li className={employeeCss.empList}><strong>Full Name</strong></li>
                    <li className={employeeCss.empList}><strong>Email</strong></li>
                    <li className={employeeCss.empList}><strong>Job Post</strong></li>
                    <li className={employeeCss.empList}><strong>Employee type</strong></li>
                    <li className={employeeCss.empList}><strong>QR Code</strong></li> 
                    <li className={employeeCss.rpt}><strong>Report</strong></li> 
                </ul>
                
            </div>
         

            
            </div>
            <div className={employeeCss.details}>
        
            {employees &&
          employees
            .filter((employee) =>
              employee.employeeid.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((employee) => (
              <div key={employee._id}>
              <EmployeeDetails employee={employee} />
          </div>
            ))}
              
            </div>
            </div>
            </div>
    )
   
}


export default EmployeeHome