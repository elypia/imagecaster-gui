import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faDebug,
  faDownload,
  faFileArchive,
  faFileExport,
  faImage,
  faObjectGroup,
  faTimes
} from '@fortawesome/pro-solid-svg-icons'
import {faGitlab} from '@fortawesome/free-brands-svg-icons'
import Navigation from "./navigation/Navigation";
import {CssBaseline} from "@material-ui/core";
import Export from "./forms/Export";

library.add(
  // Navigation Start
  faFileExport,
  faDebug,
  faObjectGroup,
  faFileArchive,

  // Naviation End
  faGitlab,

  // Field Previews
  faImage,

  // Preview Dialog
  faDownload,
  faTimes
);

/** Configura Material-UI theme. */
const Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#17679A"
    },
    secondary: {
      main: "#17679A"
    }
  }
});

const App = () => {
  return (
      <div id="app">
        <nav><Navigation/></nav>
        <main id="main">
          <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <div id="form-wrapper">
              <Export/>
            </div>
            {/*<div id="preview">*/}
              {/*Hello*/}
            {/*</div>*/}
          </ThemeProvider>
        </main>
      </div>
  );
};

export default App;
