import React, { useEffect, useState } from "react";
import { ccfAccessTokenFlowStyles } from "../../side-navbar/NavBar";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { StorageKeys } from "@nice-devone/core-sdk";
import { tryCatchWrapper } from "../../../utils/tryCatchWrapper";
import { error } from "console";

const Outbound = () => {
  const theme = useTheme();

  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  const [dialNumber, setDialNumber] = useState("");
  const [skillDetails, setSkillDetails] = useState({} as any);

  const handleStorageChange = async () => {
    const getLastLoggedInAgentId = localStorage.getItem(
      StorageKeys.LAST_LOGGED_IN_AGENT_ID
    );

    const agentId = getLastLoggedInAgentId?.toString();

    if (agentId) {
      CXoneAcdClient.instance.getAgentSkills(agentId).then((data: any) => {
        const outboundSkill = data.find(
          (skill: any) => skill.isOutbound === true
        );
        if (outboundSkill) {
          setSkillDetails(outboundSkill);
        }
      });
    }
  };

  useEffect(() => {
    tryCatchWrapper(handleStorageChange, (error) => {
      localStorage.removeItem("startsessionButton");
    });

    // Listen for storage changes across tabs
    window.addEventListener("storage", handleStorageChange);

    // Save original methods
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    // Override setItem
    localStorage.setItem = function (key: string, value: string) {
      originalSetItem.call(this, key, value);
      if (key === StorageKeys.LAST_LOGGED_IN_AGENT_ID) handleStorageChange();
    };

    // Override removeItem
    localStorage.removeItem = function (key: string) {
      originalRemoveItem.call(this, key);
      if (key === StorageKeys.LAST_LOGGED_IN_AGENT_ID) handleStorageChange();
    };

    // Cleanup on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  /**
   * dial OB call
   * @example
   * ```
   * DialCallButtonClick()
   * ```
   */
  const dialCallButtonClick = () => {
    const contactDetails = {
      skillId:
        skillDetails?.skillId /*Before using skillID agent Application must be linked with acd  */,
      phoneNumber: dialNumber,
    };

    CXoneAcdClient.instance.contactManager.voiceService
      .dialPhone(contactDetails)
      .then((res) => {
        console.log(
          "Dialled Given number and dial phone api successfully called",
          res
        );
      })
      .catch((e) => {
        console.log("eerr", e);
      });
  };

  return (
    <Box sx={accessTokenFlowStyles.inputs_alignment}>
      <TextField
        id="outlined-basic"
        label="callAgent"
        value={dialNumber}
        onChange={(e: any) => setDialNumber(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        onClick={() => {
          dialCallButtonClick();
        }}
        color="primary"
        variant="contained"
        size="large"
        sx={accessTokenFlowStyles.margin}
      >
        Dial Number
      </Button>
    </Box>
  );
};

export default Outbound;
