import React from 'react';
import './App.css';
import MuiForm from 'rjsf-material-ui';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faDebug, faFileArchive, faFileExport, faObjectGroup} from '@fortawesome/pro-solid-svg-icons'
import {faGitlab} from '@fortawesome/free-brands-svg-icons'
import Navigation from "./navigation/Navigation";

/** Import the JSON Schema. */
const Schema = require("./imagecaster.schema.json");

library.add(faFileExport, faDebug, faObjectGroup, faFileArchive, faGitlab);

const App = () => {
  return (
      <div className="App">
        <nav><Navigation/></nav>
        <main>
          <MuiForm schema={Schema}/>
        </main>
      </div>
  );
};

export default App;
