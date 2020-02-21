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
import Navigation from "./menus/navigation/Navigation";
import {CssBaseline} from "@material-ui/core";
import FormContainer from "./rjsf/form/FormContainer";
import InfoPanel from "./menus/info-panel/InfoPanel";

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
      main: "#00729a"
    },
    secondary: {
      main: "#00729a"
    }
  }
});

/** Instance of all available buttons in the navigation bar. */
const NavigationButtons: any[] = [
  {
    name: 'Export',
    icon: 'file-export',
    url: '/?form=export'
  },
  {
    name: 'Check',
    icon: 'debug',
    url: '/?form=check'
  },
  {
    name: 'Montage',
    icon: 'object-group',
    url: '/?form=montage'
  },
  {
    name: 'Archive',
    icon: 'file-archive',
    url: '/?form=archive'
  },
  {
    name: "GitLab",
    icon: ['fab', 'gitlab'],
    url: 'https://gitlab.com/Elypia/imagecaster-gui'
  }
];

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline/>
      <div id="app">
        <nav>
          <Navigation links={NavigationButtons}/>
        </nav>
        <main>
          <FormContainer/>
        </main>
        <div>
          <InfoPanel/>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
