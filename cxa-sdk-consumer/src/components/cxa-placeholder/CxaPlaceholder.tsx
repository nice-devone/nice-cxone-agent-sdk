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
import { Button } from '@mui/material';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import React, { useEffect } from 'react'


const CxaPlaceholder=()=>{
    const cxoneAuth = CXoneAuth.instance;

    useEffect(()=>{
            // Launch CXone Agent in iframe
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
    <> 
      <Button onClick={handleSwitchContact}>Switch Contact</Button>
      <div id="launchCXA">CXA Placeholder </div>
    </>
  )
}
export default CxaPlaceholder;