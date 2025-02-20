/**
 * NavBar component renders a side navigation bar with various tabs and routes.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered NavBar component.
 * 
 * @remarks
 * - From here routes got handled
 * - Authentication component call first.
 * - Side allow us navigate between features in SDK.
 * - The selected tab index is stored in localStorage and retrieved on component mount.
 * - The component listens for changes to the `auth_token` in localStorage to enable/disable tabs.
 * 
 * @example
 * ```tsx
 * <NavBar />
 * ```
 */
import  React,{useEffect,  useState} from "react";
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
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CxaPlaceholder from "../cxa-placeholder/CxaPlaceholder";
import AcdSdk from "../acd-sdk/AcdSdk";
import DigitalSdk from "../digital-sdk/DigitalSdk";
import Auth from "../auth/Auth";
import AuthCallBack from "../auth/AuthCallback";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";



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
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(localStorage.getItem("selectedIndex") ? parseInt(localStorage.getItem("selectedIndex")!) : 0);
  const [disableTab, setDisableTab] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
    if(location.pathname === "/") setSelectedIndex(0)
    if(location.pathname === "/acd-sdk") setSelectedIndex(1)
    if(location.pathname === "/digital-sdk") setSelectedIndex(2)
    if(location.pathname === "/cxa-placeholder") setSelectedIndex(3)
    localStorage.setItem("selectedIndex", selectedIndex?.toString()||"0");
  },[location.pathname,selectedIndex])

  const handleListItemClick = async(index: number) => {
    if (index === 0) navigate("/");
    if (index === 1) navigate("/acd-sdk");
    if (index === 2) navigate("/digital-sdk");
    if (index === 3) navigate("/cxa-placeholder");
    if (index === 4) {
     CXoneAcdClient.instance.initAcdEngagement();
     CXoneAcdClient.instance.session
     .endSession({
      forceLogoff: false,
      endContacts: true,
      ignorePersonalQueue: true,
    }).catch((err: any) => {
       console.log(err.message ?? "An error occured");
     });
     localStorage.clear();
     setDisableTab(true);
     window.location.href = "/";
    }
  };

  let tabNamesArray = ["Auth","ACD ","Digital ","Custom","Logout"];
 

  useEffect(() => {
    if(localStorage.getItem("auth_token")) {
      setDisableTab(false)
    }
   
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_token") {
        setDisableTab(false)
      }
    };

  
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      if (key === "auth_token") {
        setDisableTab(false)
      }
      originalSetItem.apply(this, [key, value]);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem; // Restore original setItem
    };
  }, []);

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
          {tabNamesArray.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                disabled={disableTab && index !== 0}
                selected={selectedIndex === index} 
                onClick={() => handleListItemClick(index)} 
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2", 
                    "&:hover": {
                      backgroundColor: "#1976d2", 
                    },
                    color: "white",
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
          <Route path="/auth-callback" element={<AuthCallBack />} />
          <Route path="/" element={ <Auth/> }/>
          <Route path="/acd-sdk"  element={<AcdSdk />}/>
          <Route path="/digital-sdk" element={ <DigitalSdk/>}/>
          <Route path="/cxa-placeholder" element={<CxaPlaceholder />} />
        </Routes>
      </Main>
    </Box>
  );
}
