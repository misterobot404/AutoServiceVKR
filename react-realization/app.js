import React from 'react';
import ReactDOM from 'react-dom';

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import Registration from "./views/Registration";
import {Container} from "@material-ui/core";
import './styles.css';

// setup font
const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Circe-Bold',
            'Circe-Regular',
            "Roboto",
            "Helvetica",
            "Arial"
        ].join(',')
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container disableGutters>
                    <Navbar/>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/contact" component={Contact}/>
                            <Route path="/" component={Registration}/>
                        </Switch>
                    </div>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
