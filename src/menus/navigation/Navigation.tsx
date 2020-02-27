import React, {FC, ReactNode} from 'react';
import './Navigation.css';
import NavigationButton, {NavigationButtonProps} from "./NavigationButton";

export interface NavigationProps {

  /**
   * A list of links to send to other portions of the application
   * or externally.
   */
  links: NavigationButtonProps[];
}

/** The navigation bar for this application. */
const Navigation: FC<NavigationProps> = (props: NavigationProps) => {
  const listItems: ReactNode[] = props.links.map((buttonProps: NavigationButtonProps) => {
    return (
      <li className="navigation-button-list-item" key={buttonProps.name}>
        <NavigationButton name={buttonProps.name} icon={buttonProps.icon} url={buttonProps.url}/>
      </li>
    );
  });

  return <div id="nav-items"><ul>{listItems}</ul></div>;
};

export default Navigation;
