/**
 * CxaPlaceholder component is responsible for launching the CXone Agent within an iframe.
 * 
 * This component uses the `CXoneAuth` instance to launch the CXone Agent when the component is mounted.
 * 
 * @component
 * @example
 * return (
 *   <CxaPlaceholder />
 * )
 * 
 * @returns {JSX.Element} A div element with id "launchCXA" that serves as a placeholder for the CXone Agent.
 */
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import React, { useEffect } from 'react'
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import WidgetsIcon from "@mui/icons-material/Widgets";


const CxaPlaceholder=()=>{
    const cxoneAuth = CXoneAuth.instance;

    useEffect(()=>{
            cxoneAuth.launchCXoneAgent(
                      "launchCXA",
                      "https://cxagent.nicecxone.com?src=sdk",
                      { width: "400px", height: "500px" }
                    );
    },[])

  const handleSwitchContact = () => {
    const sessionDetails =
    {
      interactionId: '123456789',
      contactId: '12345',
      mediaType: 'Mock'
    };

    CXoneClient.instance.switchContacts(sessionDetails);
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "primary.dark" }}>
        CXA Widget
      </Typography>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <WidgetsIcon color="primary" />
            <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
              CXone Agent Embed
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Button
            onClick={handleSwitchContact}
            variant="outlined"
            startIcon={<SwapHorizIcon />}
            sx={{ mb: 2 }}
          >
            Switch Contact
          </Button>
          <Box
            id="launchCXA"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              minHeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
              color: "text.secondary",
            }}
          >
            CXA Widget Loading...
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
export default CxaPlaceholder;