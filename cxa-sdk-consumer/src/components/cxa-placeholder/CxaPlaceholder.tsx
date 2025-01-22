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
    return(
        <div id="launchCXA">CXA Placeholder </div>
    )
}
export default CxaPlaceholder;