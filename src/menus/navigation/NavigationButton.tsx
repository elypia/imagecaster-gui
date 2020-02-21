import React from 'react';
import './NavigationButton.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import StringUtils from "../../utils/StringUtils";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface NavigationButtonProps {

  /** The name of the location this takes the user to. */
  name: string;

  /** The name of the FontAwesome icon this takes the user too. */
  icon: IconProp

  /** The location this takes the user too. */
  url: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = (props: NavigationButtonProps) => {
  return (
    <a className="navigation-icon-button" href={props.url} target={StringUtils.isExternalUrl(props.url) ? '_blank' : undefined}>
      <div className="icon" title={props.name} aria-label={props.name}>
        <FontAwesomeIcon icon={props.icon}/>
      </div>
    </a>
  );
};

export default NavigationButton;
