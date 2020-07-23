import React from 'react';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const InfoBox = ({title, cases, total}) => {
    return (
        <Card className='info-box'>
            <CardContent>
                <Typography className='infoBox_title' color="textSecondary">
                    {title}
                </Typography>
                <h2 className='infoBox_cases'>+ {cases}</h2>

                <Typography className='infoBox_total' color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
