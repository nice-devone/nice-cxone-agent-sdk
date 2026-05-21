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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CxaPlaceholder from "../cxa-placeholder/CxaPlaceholder";
import AcdSdk from "../acd-sdk/AcdSdk";
import DigitalSdk from "../digital-sdk/DigitalSdk";
import Auth from "../auth/Auth";
import AuthCallBack from "../auth/AuthCallback";
import EventViewer from "../event-viewer/EventViewer";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ChatIcon from "@mui/icons-material/Chat";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LogoutIcon from "@mui/icons-material/Logout";
import HubIcon from "@mui/icons-material/Hub";



const drawerWidth = 260;
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

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));

const tabIcons = [
  <LockOpenIcon />,
  <HeadsetMicIcon />,
  <ChatIcon />,
  <WidgetsIcon />,
  <LogoutIcon />,
];


export default function NavBar() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(localStorage.getItem("selectedIndex") ? parseInt(localStorage.getItem("selectedIndex")!) : 0);
  const [disableTab, setDisableTab] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if(location.pathname === "/") setSelectedIndex(0)
    if(location.pathname === "/acd-sdk") setSelectedIndex(1)
    if(location.pathname === "/digital-sdk") setSelectedIndex(2)
    if(location.pathname === "/cxa-placeholder") setSelectedIndex(3)
    localStorage.setItem("selectedIndex", selectedIndex?.toString()||"0");
  },[location.pathname,selectedIndex])

  const handleListItemClick = async(index: number) => {
    if (!isDesktop) setMobileOpen(false);
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

  let tabNamesArray = ["Authentication","ACD SDK","Digital SDK","CXA Widget","Logout"];
 

  useEffect(() => {
    if(localStorage.getItem("auth_token") || localStorage.getItem("cxagent.sk")) {
      setDisableTab(false)
    }
   
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_token" || event.key === "cxagent.sk") {
        setDisableTab(false)
      }
    };

  
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      if (key === "auth_token" || key === "cxagent.sk") {
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

  const drawerContent = (
    <>
        <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              width: 40,
              height: 40,
            }}
          >
            <HubIcon sx={{ color: "#64b5f6" }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
              CXone SDK
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
              Consumer App
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mx: 1 }} />
        <List sx={{ px: 1, mt: 1 }}>
          {tabNamesArray.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                disabled={disableTab && index !== 0}
                selected={selectedIndex === index} 
                onClick={() => handleListItemClick(index)} 
                sx={{
                  borderRadius: 2,
                  mx: 0.5,
                  py: 1.2,
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                    color: "#ffffff",
                    "& .MuiListItemIcon-root": {
                      color: "#64b5f6",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.35,
                  },
                  ...(index === tabNamesArray.length - 1 && {
                    color: "#ef9a9a",
                    "&:hover": { backgroundColor: "rgba(239,154,154,0.1)" },
                  }),
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40, 
                  color: index === tabNamesArray.length - 1 ? "#ef9a9a" : "rgba(255,255,255,0.5)",
                }}>
                  {tabIcons[index]}
                </ListItemIcon>
                <ListItemText 
                  primary={text} 
                  primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: selectedIndex === index ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2, mx: 1, mb: 1 }}>
          <Chip
            size="small"
            label={!disableTab ? "Connected" : "Not Connected"}
            sx={{
              backgroundColor: !disableTab ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.1)",
              color: !disableTab ? "#81c784" : "rgba(255,255,255,0.5)",
              fontWeight: 500,
              fontSize: "0.7rem",
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>
    </>
  );

  const drawerPaperSx = {
    width: drawerWidth,
    boxSizing: "border-box" as const,
    background: "linear-gradient(180deg, #1a237e 0%, #0d1b60 100%)",
    color: "#ffffff",
    borderRight: "none",
  };

  const currentTabLabel = tabNamesArray[selectedIndex ?? 0] ?? "CXone SDK";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Mobile AppBar with hamburger */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "flex", md: "none" },
          background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            aria-label="open navigation"
            sx={{ mr: 1.5 }}
          >
            <MenuIcon />
          </IconButton>
          <HubIcon sx={{ color: "#64b5f6", mr: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
            CXone SDK
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {currentTabLabel}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": drawerPaperSx,
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary drawer for mobile */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": drawerPaperSx,
        }}
      >
        {drawerContent}
      </Drawer>

      <Main>
        {/* Spacer to offset fixed AppBar on mobile */}
        <Toolbar variant="dense" sx={{ display: { xs: "block", md: "none" } }} />
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 2 }, pb: 8 }}>
          <Routes>
            <Route path="/auth-callback" element={<AuthCallBack />} />
            <Route path="/" element={ <Auth/> }/>
            <Route path="/acd-sdk"  element={<AcdSdk />}/>
            <Route path="/digital-sdk" element={ <DigitalSdk/>}/>
            <Route path="/cxa-placeholder" element={<CxaPlaceholder />} />
          </Routes>
        </Container>
      </Main>

      <EventViewer leftOffset={isDesktop ? drawerWidth : 0} />
    </Box>
  );
}
