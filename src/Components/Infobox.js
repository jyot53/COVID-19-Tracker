import React from 'react'
import {Card,Typography,CardContent} from '@material-ui/core'
const Infobox = ({title,cases,active,total , ...props}) => {
    return (
        <Card onClick={props.onClick} className={`infobox ${active && "infobox--selected"}`}>
            <CardContent>
                <Typography className="infobox_title" color='textSecondary'>
                    {title ? title : 0}
                </Typography>

                <h2 className="infobox_cases">{cases ? cases : 0}</h2>

                <Typography className="infobox_total" color='textSecondary'>
                    {total ? total : 0} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
