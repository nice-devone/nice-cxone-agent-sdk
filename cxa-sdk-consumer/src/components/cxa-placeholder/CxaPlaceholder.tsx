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
import { useEffect } from 'react'


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

  const handleEvent = () => {
    const sessionDetails =
    {
      interactionId: '060a4e8a-238d-4866-8755-1f94a9f45d65',
      contactId: '316436517', mediaType: 'Digital'
    }

    CXoneClient.instance.switchContacts(sessionDetails);
  }
  return (
    <>
      <Button onClick={handleEvent}>fire event</Button>
      <div id="launchCXA">CXA Placeholder </div>
    </>
  )
}
export default CxaPlaceholder;