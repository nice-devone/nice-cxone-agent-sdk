import React, { useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { CXoneAcdClient } from "@nice-devone/acd-sdk";
import { StorageKeys, Logger } from "@nice-devone/core-sdk";
import { tryCatchWrapper } from "../../../utils/tryCatchWrapper";
import PhoneIcon from "@mui/icons-material/Phone";

const logger = new Logger('SDK-CONSUMER', 'Outbound');


const Outbound = () => {
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
      .then(() => {
        logger.info("dialPhone", '');
      })
      .catch(() => {
        logger.error("dialPhone", '');
      });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label="Phone Number"
        value={dialNumber}
        onChange={(e: any) => setDialNumber(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ minWidth: 220 }}
      />
      <Button
        onClick={() => {
          dialCallButtonClick();
        }}
        variant="contained"
        startIcon={<PhoneIcon />}
        disabled={!dialNumber}
      >
        Dial Number
      </Button>
    </Stack>
  );
};

export default Outbound;
