import "./assets/style.scss";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Home } from "./pages/Home";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#45190E",
        },
        secondary: {
            main: "#FF7306",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Home />
            </div>
        </ThemeProvider>
    );
}

export default App;
