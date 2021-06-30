import React from 'react';
import {Link as L} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Avatar, Box, Button, Checkbox, Dialog, DialogContent, FormControlLabel, Grid, TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showAuthDialog: false};

        // Эта привязка обязательна для работы `this` в колбэке.
        this.authDialogOpen = this.authDialogOpen.bind(this);
        this.authDialogClose = this.authDialogClose.bind(this);
    }

    authDialogOpen() {
        this.setState(_ => ({
            showAuthDialog: true
        }));
    };

    authDialogClose() {
        this.setState(_ => ({
            showAuthDialog: false
        }));
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Typography component={'div'} className='navbar'>
                    <div className="navbar-logo"/>

                    <div className="navbar-link">
                        <Link
                            className="text-decoration-none"
                            component={L}
                            to="/"
                            color="inherit"
                        >
                            Услуги
                        </Link>
                    </div>
                    <div className="navbar-link">
                        <Link
                            className="text-decoration-none"
                            component={L}
                            to="/about"
                            color="inherit"
                        >
                            Акции
                        </Link>
                    </div>
                    <div className="navbar-link">
                        <Link
                            className="text-decoration-none"
                            component={L}
                            to="/contact"
                            color="inherit"
                        >
                            О компании
                        </Link>
                    </div>
                    <div className="navbar-link">
                        <Link
                            className="text-decoration-none"
                            component={L}
                            to="/contact"
                            color="inherit"
                        >
                            Работа
                        </Link>
                    </div>
                    <div className="navbar-link">
                        <Link
                            className="text-decoration-none"
                            component={L}
                            to="/contact"
                            color="inherit"
                        >
                            Контакты
                        </Link>
                    </div>

                    <div className="navbar-link">
                        <AccountBoxOutlinedIcon
                            onClick={this.authDialogOpen}
                            className="cursor-pointer"
                            style={{fontSize: 36}}
                        />
                    </div>
                </Typography>
                <Dialog open={this.state.showAuthDialog} onClose={this.authDialogClose} aria-labelledby="form-dialog-title">
                    <DialogContent className={classes.dialogContent}>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Вход в личный кабинет
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Электронная почта"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Запомнить меня"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Войти
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Забыли пароль?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            className="text-decoration-none"
                                            component={L}
                                            onClick={this.authDialogClose}
                                            to="/registration"
                                            variant="body2"
                                        >
                                            Нет аккаунта? Зарегистрируйтесь
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={8}>
                            <Copyright/>
                        </Box>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Автосервис «Всё для Авто» '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = theme => ({
    dialogContent: {
      padding: '16px 32px'
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

export default withStyles(useStyles)(Navbar);
