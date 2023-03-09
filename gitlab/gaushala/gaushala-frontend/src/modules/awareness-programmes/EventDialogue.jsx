import { Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const EventDialogue = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className='dialogue_bx_content'>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <p>{`${t("add_programmes.event_title")}`}</p>
                    <span>गोजातीय प्रजनन और डेयरी विकासकर्ताओं के लिए राष्ट्रीय कार्यक्रम</span>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <p>{`${t("add_programmes.event_date")}`}</p>
                            <span>27-07-2022</span>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{`${t("add_programmes.event_time")}`} </p>
                            <span>23:01</span>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{`${t("add_programmes.event_place")}`}</p>
                            <span>सेक्टर- २ नॉएडा</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventDialogue