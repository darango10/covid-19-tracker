import React from 'react';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import './InfoBox.css'

const InfoBox = ({title, cases, total, active, isRed, ...props}) => {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && 'infoBox_selected'} ${isRed && 'infoBox_red'}`}>
            <CardContent>
                <Typography className='infoBox_title' color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${!isRed && 'infoBox_green'}`}>{cases}</h2>

                <Typography className='infoBox_total' color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
