import React, {Component, ReactNode} from 'react';
import './InfoPanel.css';
import {Tabs} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Preview from "../../panels/Preview";
import Documentation from "../../panels/Documentation";
import SwipeableViews from "react-swipeable-views";

interface InfoPanelProps {

}

interface InfoPanelState {

  /** The value indicating the currently selected tag. */
  value: number;
}

export default class InfoPanel extends Component<InfoPanelProps, InfoPanelState> {

  public constructor(props: InfoPanelProps) {
    super(props);
    this.state = {
      value: 0
    };
  }

  public render() : ReactNode {
    const {value} = this.state;

    return (
      <div className="info-panel-root">
        <Tabs
          value={value}
          onChange={(e, v) => this.setState({value: v})}
        >
          <Tab label="Documentation"/>
          <Tab label="Preview"/>
        </Tabs>
        <SwipeableViews index={value}>
          <Documentation/>
          <Preview images={[]}/>
        </SwipeableViews>
      </div>
    );
  }
}
