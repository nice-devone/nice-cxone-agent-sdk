import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Box from '@mui/material/Box';

const HorizontalCards = ({ contact, selected }) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                px: 2,
                py: 1.5,
                minWidth: 140,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderColor: selected ? 'primary.main' : 'divider',
                backgroundColor: selected ? 'primary.main' : 'background.paper',
                color: selected ? '#fff' : 'text.primary',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 2px 8px rgba(26,35,126,0.15)',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 500 }}>
                        Case ID
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                        {contact.caseId}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};
export default HorizontalCards;