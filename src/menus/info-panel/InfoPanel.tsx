import React, {Component, ReactNode} from 'react';
import './InfoPanel.css';
import {Tabs} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

export default class InfoPanel extends Component {

  public render() : ReactNode {
    return (
      <div className="info-panel-root">
        <Tabs variant="scrollable" value="Preview" aria-label="Vertical tabs example">
          <Tab label="Preview" value="Preview"/>
          <Tab label="Documentation" value="Documentation"/>
        </Tabs>
      </div>
    );
  }
}
