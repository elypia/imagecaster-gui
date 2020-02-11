import React from 'react';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faDebug, faFileArchive, faFileExport, faObjectGroup} from '@fortawesome/pro-solid-svg-icons'
import Navigation from "./navigation/Navigation";

library.add(faFileExport, faDebug, faObjectGroup, faFileArchive);

const App = () => {
  return (
    <Navigation/>
  );
}

export default App;
