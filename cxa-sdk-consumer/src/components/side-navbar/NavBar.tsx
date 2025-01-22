import  React,{useEffect, useRef, useState} from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Authentication from "../authentication";
import { Route, Routes, useNavigate } from "react-router-dom";
import CxaPlaceholder from "../cxa-placeholder/CxaPlaceholder";
import AcdSdk from "../acd-sdk/AcdSdk";
import DigitalSdk from "../digital-sdk/DigitalSdk";
import Auth from "../auth/Auth";


const drawerWidth = 240;
export const ccfGaAccessTokenFlowStyles = (theme: Theme) => {
  const styles = {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    margin: {
      margin: theme.spacing(1),
      MaxWidth: "max-content",
    },
    width: {
      width: "25ch",
      margin: theme.spacing(1),
    },
    msg_box: {
      border: 1,
      width: "50%",
      boxSizing: "border-box",
    },
    font_size: {
      fontWeight: "500",
    },
    card_content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
    },
    text_left: {
      textAlign: "left",
    },
    text_center: {
      textAlign: "center",
    },
    reply_textbox: {
      paddingBottom: "0 !important",
      paddingLeft: "0",
      paddingRight: "0",
      marginBottom: "-16px",
      marginLeft: "-16px",
    },
    acd_width: {
      width: "12rem",
      margin: theme.spacing(2),
    },
  };
  return styles;
};

export const ccfAccessTokenFlowStyles = (theme: Theme) => {
  const styles = {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    reply_btn: {
      margin: "0",
    },
    widthAuto: {
      maxWidth: "max-content",
    },
    mar_0: {
      margin: "0",
    },
    pad_0: {
      margin: "0",
    },
    inputs_alignment: {
      display: "flex",
      gap: theme.spacing(1),
      justifyContent: "center",
    },
    case_alignment: {
      display: "flex",
      gap: "0.5rem",
    },
    text_alignment: {
      wordBreak: "break-all",
    },
    reply_width: {
      width: "100%",
    },
    flex_column: {
      flexDirection: "column",
      textAlign: "left",
      alignItems: "center",
    },
  };
  return styles;
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavBar() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const navigate = useNavigate();

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (index === 0) navigate("/");
    if (index === 1) navigate("/acd-sdk");
    if (index === 2) navigate("/digital-sdk");
    if (index === 3) navigate("/cxa-placeholder");
  };

  const tabNames = ["Auth", "ACD", "Digital", "Custom"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <DrawerHeader>
          <IconButton>
            {theme.direction === "ltr" ? (
              <>CXA CONSUMER</>
            ) : (
              <>ChevronRightIcon</>
            )}
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
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2", // Apply blue background when selected
                    "&:hover": {
                      backgroundColor: "#1976d2", // Maintain blue background on hover
                    },
                    color: "white", // Set text color to white when selected
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={true}>
        <DrawerHeader />
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
          <Route
            path="/"
            element={
              <Auth/>
            }
          />
           <Route
            path="/acd-sdk"
            element={
              <AcdSdk />
            }
          />
            <Route
            path="/digital-sdk"
            element={
              <DigitalSdk/>
            }
          />
          <Route path="/cxa-placeholder" element={<CxaPlaceholder />} />
         
        </Routes>
      </Main>
    </Box>
  );
}
