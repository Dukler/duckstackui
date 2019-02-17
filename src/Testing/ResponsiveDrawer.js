import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import EventIcon from '@material-ui/icons/EventAvailable';
// import ContactsIcon from '@material-ui/icons/Contacts';
// import CalendarIcon from '@material-ui/icons/DateRange';
// import NotesIcon from '@material-ui/icons/Notes';
import {constants} from "../Constants";
import LinkList from "../Containers/LinkList";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <LinkList url = {constants.home} toolbar = {classes.toolbar}/>
            // <div>
            //     <div className={classes.toolbar} />
            //     <Divider />
            //     <List>
            //         <ListItem button key={"Turnos"}>
            //             <ListItemIcon>{<EventIcon/>}</ListItemIcon>
            //             <ListItemText primary={"Turnos"}/>
            //         </ListItem>
            //         <ListItem button key={"Clientes"}>
            //             <ListItemIcon>{<ContactsIcon/>}</ListItemIcon>
            //             <ListItemText primary={"Clientes"}/>
            //         </ListItem>
            //         <ListItem button key={"Calendario"}>
            //             <ListItemIcon>{<CalendarIcon/>}</ListItemIcon>
            //             <ListItemText primary={"Calendario"}/>
            //         </ListItem>
            //         <ListItem button key={"Historiales?"}>
            //             <ListItemIcon>{<NotesIcon/>}</ListItemIcon>
            //             <ListItemText primary={"Historiales?"}/>
            //         </ListItem>
            //     </List>
            //     <Divider />
            //     <List>
            //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
            //             <ListItem button key={text}>
            //                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            //                 <ListItemText primary={text} />
            //             </ListItem>
            //         ))}
            //     </List>
            // </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Responsive drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography paragraph>
                        shit1
                    </Typography>
                    <Typography paragraph>
                        shit2
                    </Typography>
                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);