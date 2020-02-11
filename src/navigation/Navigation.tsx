import React, {ReactNode} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Navigation.css';

/** An individual button representing an interface that can be accessed. */
interface NavigationButton {

  /** The name of this icon. */
  name: string;

  /** The FontAwesome name of this icon. */
  icon: ReactNode;
}

/** The navigation bar for this application. */
export default class Navigation extends React.Component {

  /** Instance of all available buttons in the navigation bar. */
  private static readonly NavigationButtons: NavigationButton[] = [
    {name: 'Export', icon: <FontAwesomeIcon icon="file-export"/>},
    {name: 'Check', icon: <FontAwesomeIcon icon="debug"/>},
    {name: 'Montage', icon: <FontAwesomeIcon icon="object-group"/>},
    {name: 'Archive', icon: <FontAwesomeIcon icon="file-archive"/>}
  ];

  public render(): ReactNode {
    const listItems: ReactNode[] = Navigation.NavigationButtons.map((button) => {
      return <li>
        {button.icon}
      </li>
    });

    return <nav><ul>{listItems}</ul></nav>;
  }
}
