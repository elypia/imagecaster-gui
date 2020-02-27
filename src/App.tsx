import React, {FC} from 'react';
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
import MainPanel from "./menus/main-panel/MainPanel";
import {faEye} from "@fortawesome/pro-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/pro-solid-svg-icons/faTrashAlt";

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

  // Preview
  faDownload,
  faTimes,
  faTrashAlt,
  faEye
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
    name: 'Build',
    icon: 'file-export',
    url: '/?form=build'
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

const App: FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline/>
      <div id="app">
        <nav>
          <Navigation links={NavigationButtons}/>
        </nav>
        <main id="app-root-main">
          <MainPanel/>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
