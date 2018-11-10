import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
import { userActions } from '../../_actions';
import { history } from '../../_helpers/history.js';
import Button from 'material-ui/Button';
import {cookies} from "../../variables/general";

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        height: '100vh',
        alignContent: 'center'
    },
    image: {
        position: 'relative',
        height: 250,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        color: 'white',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
        fontSize: 36,
        fontWeight: 1500,
        fontFamily: "黑体",
    },
    imageMarked: {
        height: 3,
        width: 160,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 80px)',
        transition: theme.transitions.create('opacity'),
    },
    title: {
        position: 'absolute',
        left: "10%",
        top: "8%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        fontWeight: 1500,
        fontFamily: "黑体",
    },
    subtitle: {
        position: 'absolute',
        left: "12%",
        top: "12%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 1500,
        fontFamily: "黑体",
    },
    titleImg: {
        position: 'absolute',
        left: -60,
        top: -20,
        width: 50,
    },
    button:{
        position: 'absolute',
        left: "90%",
        top: "10%",
        width: 150,
    }
});

const images = [
    {
        url: '/static/images/harbourmap.png',
        title: '港口地图',
        width: '50%',
        path: '/harbourmap'
    },
    {
        url: '/static/images/harbourinfo.jpg',
        title: '港口资讯',
        width: '50%',
        path: '#'
    },
    {
        url: '/static/images/harbourcensor.jpg',
        title: '舆情监测',
        width: '50%',
        path: '#'
    },
    {
        url: '/static/images/harbourscore.jpg',
        title: '港口绩效',
        width: '50%',
        path: '/harbourscore'
    },


];

function FirstPage(props) {
    const {classes} = props;

    // handleLogout = () => {
    //     userActions.logout();
    //     history.push('/login');
    //     //this.setState({ open: !this.state.open });
    // };

    return (
        <div className={classes.root}>
            <span className={classes.title}><img src="/static/images/logo.png" className={classes.titleImg}></img>智慧港口整体解决方案</span>
            <span className={classes.subtitle}>地图、资讯、舆情、绩效四合一管理系统</span>
            <Button color="primary" className={classes.button} onClick={ () => { userActions.logout(); history.push('/login');}}>{cookies.get('username')}注销</Button>
            {images.map(image => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    style={{
                        width: image.width,
                    }}
                >
            <span
                className={classes.imageSrc}
                style={{
                    backgroundImage: `url(${image.url})`,
                }}
            />
                    <span className={classes.imageBackdrop}/>
                    <span className={classes.imageButton}>
            <Link to={image.path}>
              <Typography
                  component="span"
                  variant="subheading"
                  className={classes.imageTitle}
              >
                {image.title}
                  <span className={classes.imageMarked}/>
              </Typography>
             </Link>
            </span>
                </ButtonBase>
            ))}

        </div>
    );
}

FirstPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FirstPage);
