import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import MuiForm from 'rjsf-material-ui';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faDebug, faFileArchive, faFileExport, faObjectGroup} from '@fortawesome/pro-solid-svg-icons'
import {faGitlab} from '@fortawesome/free-brands-svg-icons'
import Navigation from "./navigation/Navigation";
import {CssBaseline} from "@material-ui/core";
import ModulateWidget from "./widgets/ModulateWidget";

library.add(faFileExport, faDebug, faObjectGroup, faFileArchive, faGitlab);

/** Configura Material-UI theme. */
const Theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

/** Import the JSON Schema. */
const JsonSchema = require("./imagecaster-export.schema.json");

const UiSchema = {
  "export": {
    "colors": {
      "modulate": {
        "items": {
          "ui:field": "modulate"
        }
      }
    }
  }
};

const Fields : { [name: string]: any; } = {
  "modulate": ModulateWidget
};

const App = () => {
  const search: string = window.location.search;
  const params: URLSearchParams = new URLSearchParams(search);
  const formData: string | null = params.get('form-data');
  const formDataJson: object = JSON.parse(formData || '{}');

  console.debug("FormData set to: ", formDataJson);

  return (
      <div id="app">
        <nav><Navigation/></nav>
        <main id="main">
          <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <div id="form-wrapper">
              <MuiForm schema={JsonSchema} uiSchema={UiSchema} formData={formDataJson} fields={Fields}/>
            </div>
            <div id="preview">
              Hello
            </div>
          </ThemeProvider>
        </main>
      </div>
  );
};

export default App;
