import React from "react";
import MGrid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import useContainer from "../../Hooks/Component/useContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    Grid: {},
}));

function GridEmpty() {
    return <MGrid item />;
}

function Grid(props) {
    const {componentsState, containerState} = props;
    const classes = useStyles();

    const {All} = useContainer({
        componentsState,
        containerState,
        parents: ["All"],
        styleContainers: {
            Default: MGrid,
            Empty: GridEmpty,
        },
    });

    return (
        <div className={classes.root}>
            <MGrid {...containerState.params}>{All}</MGrid>
        </div>
    );
}

export default Grid;
