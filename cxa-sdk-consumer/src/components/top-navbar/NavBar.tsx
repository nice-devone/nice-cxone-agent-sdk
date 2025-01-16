import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Authentication from '../authentication';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CxaPlaceholder from '../cxa-placeholder/CxaPlaceholder';
import AcdSdk from '../acd-sdk/AcdSdk';
import DigitalSdk from '../digital-sdk/DigitalSdk';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));





const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const navigate = useNavigate();



  const handleListItemClick = (index: number) => {

    setSelectedIndex(index);
    if (index === 0) navigate('/');
    if (index === 1) navigate('/acd-sdk');
    if (index === 2) navigate('/digital-sdk');
    if (index === 3) navigate('/cxa-placeholder');
  };

  const tabNames= ['Auth', 'ACD', 'Digital', 'Custome'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'ltr' ? <>CXA CONSUMER</> : <>ChevronRightIcon</>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabNames.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selectedIndex === index} // Highlight selected item
                onClick={() => handleListItemClick(index)} // Set selected item
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#1976d2', // Apply blue background when selected
                    '&:hover': {
                      backgroundColor: '#1976d2', // Maintain blue background on hover
                    },
                    color: 'white', // Set text color to white when selected
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            <Routes>
                <Route path="/" element={<Authentication />} />
                <Route path="/cxa-placeholder" element={<CxaPlaceholder />} />
                <Route path="/acd-sdk" element={<AcdSdk agentStatus={{}} dialCallButtonClick={() => { } } setSessionEndMessage={function (e: any): void {
                      throw new Error('Function not implemented.');
                  } } />} />
                <Route path="/digital-sdk" element={<DigitalSdk inputValue={''} digitalContact={[]} sendReply={()=>{}} handleChange={(e)=>{}}/>} />


            </Routes>
      </Main>
    </Box>
  );
}
