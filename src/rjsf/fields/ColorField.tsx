import React, {Component, ReactNode} from 'react';
import './ColorField.css';
import {FieldUtils} from "../../utils/FieldUtils";
import {FieldProps} from "react-jsonschema-form";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

  public render(): ReactNode {
    const {name, prefix} = this.state;

    return (
      <div>
        <div className="color-first">
          <TextField className="value-field" value={name} label="Name" onChange={FieldUtils.setState('name', this)}/>
          <TextField className="value-field" value={prefix} label="Prefix" onChange={FieldUtils.setState('prefix', this)}/>
          <Button variant="contained">
            <FontAwesomeIcon icon="image"/>
          </Button>
        </div>
      </div>
    );
  }
}
