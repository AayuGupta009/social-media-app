import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();
    
  return (
<>
<Box  className="footer"sx={{display:"flex",padding:"0.7% 6%",backgroundColor:'white',borderTop:' 1px solid #D2D2D2'} }>
  
    <Typography component="span" fontWeight={600}>
    {t("login.part6")}
    </Typography >  &nbsp;&nbsp;&nbsp;|  &nbsp;&nbsp;&nbsp;&nbsp;
    <Typography component="span" fontWeight={600}>
   {t("login.part7")}   
    </Typography>  &nbsp; |&nbsp;&nbsp; &nbsp;&nbsp;
    <Typography component="span" fontWeight={600}>
  {t("login.part8")}
    </Typography>
 
  </Box></>
  )
}
export default Footer;
