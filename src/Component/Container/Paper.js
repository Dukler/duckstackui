import React from "react";
import MPaper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        //alignItems: 'center',
        padding: theme.spacing(1, 2, 2),
        width: "100%",
        height: "100%",
    },
}));

function Paper(props) {
    const {children} = props;
    const classes = useStyles();

    return <MPaper className={classes.paper}>{children}</MPaper>;
}

export default Paper;
