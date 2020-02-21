import React, {Component, ReactNode} from 'react';
import './ColorField.css';
import {FieldUtils} from "../../utils/FieldUtils";
import {FieldProps} from "react-jsonschema-form";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MySlider from "../widgets/MySlider";

export interface ColorFieldState {
  name: string;
  prefix: string;
  brightness: number;
  saturation: number;
  hue: number;
}

/** Widget that displays color and modulation settings and previews. */
export default class ColorField extends Component<FieldProps, ColorFieldState> {

  public constructor(props: FieldProps) {
    super(props);
    this.state = {...props.formData};
  }

  private handleBrightnessChange() {
    return (value: number) => {
      this.setState({brightness: value});
    };
  }

  private handleSaturationChange() {
    return (value: number) => {
      this.setState({saturation: value});
    };
  }

  private handleHueChange() {
    return (value: number) => {
      this.setState({hue: value});
    };
  }

  public render(): ReactNode {
    const {name, prefix} = this.state;
    const {brightness, saturation, hue}: any = this.props.schema.properties;

    return (
      <div>
        <div className="color-first">
          <TextField className="value-field" value={name} label="Name" onChange={FieldUtils.setState('name', this)}/>
          <TextField className="value-field" value={prefix} label="Prefix" onChange={FieldUtils.setState('prefix', this)}/>
          <Button variant="contained">
            <FontAwesomeIcon icon="image"/>
          </Button>
        </div>
        <MySlider {...this.props} {...brightness} schema={brightness} value={this.state.brightness} onChange={this.handleBrightnessChange}/>
        <MySlider {...this.props} {...saturation} schema={saturation} value={this.state.saturation} onChange={this.handleSaturationChange}/>
        <MySlider {...this.props} {...hue} schema={hue} value={this.state.hue} onChange={this.handleHueChange}/>
      </div>
    );
  }
}
