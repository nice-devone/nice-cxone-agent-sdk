import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  ccfAccessTokenFlowStyles,
  ccfGaAccessTokenFlowStyles,
} from "../side-navbar/NavBar";

const DigitalSdk = ({
  digitalContact,
  handleChange,
  inputValue,
  sendReply,
}: {
  digitalContact: any;
  handleChange: any;
  inputValue: any;
  sendReply: any;
}) => {
  const theme = useTheme();
  const gaAccessTokenFlowStyles = ccfGaAccessTokenFlowStyles(theme);
  const accessTokenFlowStyles = ccfAccessTokenFlowStyles(theme);
  return (
    <Card>
      <CardHeader title={`Digital sdk`} />
      <CardContent>
        <form className="root">
          <Box
            sx={[
              accessTokenFlowStyles.inputs_alignment,
              accessTokenFlowStyles.flex_column,
            ]}
          >
            <CardContent sx={accessTokenFlowStyles.case_alignment}>
              <InputLabel>caseId:</InputLabel> {digitalContact?.caseId}
            </CardContent>
            <CardContent sx={gaAccessTokenFlowStyles.msg_box}>
              Messages :
              <div style={{ display: "flex", flexDirection: "column" }}>
                {(digitalContact?.messages || []).map((item: any) => {
                  if (item?.direction == "inbound") {
                    return <div>{item.messageContent.text}</div>;
                  } else {
                    return (
                      <div style={{ alignSelf: "end" }}>
                        {item.messageContent.text}
                      </div>
                    );
                  }
                })}
              </div>
              <CardContent
                sx={[
                  gaAccessTokenFlowStyles.card_content,
                  gaAccessTokenFlowStyles.reply_textbox,
                ]}
              >
                <TextField
                  sx={accessTokenFlowStyles.reply_width}
                  id="outlined-basic"
                  value={inputValue}
                  onChange={(e) => handleChange(e)}
                  inputProps={{ shrink: true }}
                />
                <Button
                  onClick={sendReply}
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={!inputValue}
                  sx={accessTokenFlowStyles.reply_btn}
                >
                  Reply
                </Button>
              </CardContent>
            </CardContent>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
export default DigitalSdk;
