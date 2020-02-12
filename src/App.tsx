import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import MuiForm from 'rjsf-material-ui';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faDebug, faFileArchive, faFileExport, faObjectGroup} from '@fortawesome/pro-solid-svg-icons'
import {faGitlab} from '@fortawesome/free-brands-svg-icons'
import Navigation from "./navigation/Navigation";
import {CssBaseline} from "@material-ui/core";

/** Import the JSON Schema. */
const Schema = require("./imagecaster.schema.json");

/** Configura Material-UI theme. */
const Theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

library.add(faFileExport, faDebug, faObjectGroup, faFileArchive, faGitlab);

const App = () => {
  const search: string = window.location.search;
  const params: URLSearchParams = new URLSearchParams(search);
  const formData: string | null = params.get('form-data');
  const formDataJson: object = JSON.parse(formData || '{}');

  console.debug("FormData set to: ", formData);

  return (
      <div className="App">
        <nav><Navigation/></nav>
        <main>
          <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <div className="Form-wrapper">
              <MuiForm schema={Schema} formData={formDataJson}/>
            </div>
          </ThemeProvider>
        </main>
      </div>
  );


};

export default App;
