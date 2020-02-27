import React, {Component, ReactNode} from 'react';
import './ColorField.css';
import {FieldProps} from "react-jsonschema-form";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios, {AxiosError, AxiosResponse} from "axios";
import {FieldUtils} from "../../utils/FieldUtils";
import PreviewableImage from "../../models/PreviewableImage";
import ModulateRequest from "../../models/requests/ModulateRequest";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";

interface ColorFieldState {

  /** The name of the color this modulation represents. */
  name?: string;

  /** The prefix to prepend to the resulting file. */
  prefix?: string;

  /** A percentage from 0 to 200% for what to change the brightness by. */
  brightness?: number;

  /** A percentage from 0 to 200% for what to change the brightness by. */
  saturation?: number;

  /** A percentage from 0 to 200% for what to change the brightness by. */
  hue?: number;

  /** The currently visible error message if something has gone wrong. */
  error?: string;
}

/** Widget that displays color and modulation settings and previews. */
export default class ColorField extends Component<FieldProps, ColorFieldState> {

  public constructor(props: FieldProps) {
    super(props);
    this.state = {
      brightness: 100,
      saturation: 100,
      hue: 100,
      ...props.formData
    };

    this.handlePreviewConfiguration = this.handlePreviewConfiguration.bind(this);
    this.handleBrightnessChange = this.handleBrightnessChange.bind(this);
    this.handleSaturationChange = this.handleSaturationChange.bind(this);
    this.handleHueChange = this.handleHueChange.bind(this);
  }

  /**
   * @param value The value to check against.
   * @param defaultValue The optional default value to compare against.
   * @returns True if the value is unset or default, else false.
   */
  private isUnsetOrDefault(value: number | undefined, defaultValue?: number) : boolean {
    return value === undefined || value === null || value === defaultValue;
  }

  /**
   * Test this configuration on one of the input images specified.
   */
  private handlePreviewConfiguration() : void {
    console.debug('Clicked preview button for modulate.');
    const {brightness, saturation, hue} = this.state;

    if (this.isUnsetOrDefault(brightness, 100) && this.isUnsetOrDefault(saturation, 100) && this.isUnsetOrDefault(hue, 100)) {
      this.setState({
        error: 'Not previewing as nothing will change.'
      });

      return;
    }

    const build = this.props.formContext.formData.build;
    const inputArray: string[] = build.input;

    if (!inputArray) {
      this.setState({error: 'Unable to preview without input image.'});
      console.info('Stopped performing preview image action due to no input. (inputArray: %s)', inputArray);
      return;
    }

    const input: string = inputArray[0];

    if (!input) {
      this.setState({error: 'Invalid file provided to image array.'});
      console.warn('Something went wrong while processing the images. (input: %s)', input);
      return;
    }

    const mask: string = build.colors.mask;

    this.requestPreview(input, mask, brightness, saturation, hue);
  }

  /**
   * Make a request to the backend to modulate and preview
   * this image with the defined configuration.
   *
   * @param input The original image to modulate.
   * @param mask The optional clipping mask to select what gets modulated.
   * @param brightness A percentage between 0 and 200.
   * @param saturation A percentage between 0 and 200.
   * @param hue A percentage between 0 and 200.
   */
  private requestPreview(input: string, mask: string, brightness?: number, saturation?: number, hue?: number) : void {
    const request: ModulateRequest = {
      image: input,
      mask: mask,
      brightness: brightness,
      saturation: saturation,
      hue: hue
    };

    console.info('Previewing image with modulation with values: %s / %s / %s', brightness, saturation, hue);

    axios.post('http://localhost:5000/preview/modulate', request)
      .then((resp: AxiosResponse) => {
        console.log('Completed request and received preview succesfully.');
        const timestamp: Date = new Date();

        const previewableImage: PreviewableImage = {
          id: timestamp.getTime(),
          data: resp.data,
          timestamp: timestamp,
          parameters: {
            brightness: brightness,
            saturation: saturation,
            hue: hue
          }
        };

        this.props.formContext.handleAppendToPreview(previewableImage);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        this.setState({error: error.message});
        return;
      });
  }

  private handleBrightnessChange(event: any, newValue: number | number[]) : void {
    this.setState({
      brightness: newValue as number
    }, () => this.props.onChange(this.state))
  }

  private handleSaturationChange(event: any, newValue: number | number[]) : void {
    this.setState({
      saturation: newValue as number
    }, () => this.props.onChange(this.state))
  }

  private handleHueChange(event: any, newValue: number | number[]) : void {
    this.setState({
      hue: newValue as number
    }, () => this.props.onChange(this.state))
  }

  public render(): ReactNode {
    const {name, prefix, brightness, saturation, hue, error} = this.state;

    return (
      <div>
        <div className="color-first">
          <TextField className="value-field" defaultValue={name} label="Name" onChange={FieldUtils.setState('name', this)}/>
          <TextField className="value-field" defaultValue={prefix} label="Prefix" onChange={FieldUtils.setState('prefix', this)}/>
          <Button variant="contained" onClick={this.handlePreviewConfiguration}>
            <FontAwesomeIcon icon="image"/>
          </Button>
        </div>
        <div>
          <div className="color-slider">
            <Typography className="color-slider-label">Brightness</Typography>
            <Slider
              min={0}
              max={200}
              value={brightness}
              valueLabelDisplay="auto"
              onChange={this.handleBrightnessChange}
            />
          </div>
          <div className="color-slider">
            <Typography className="color-slider-label">Saturation</Typography>
            <Slider
              min={0}
              max={200}
              value={saturation}
              valueLabelDisplay="auto"
              onChange={this.handleSaturationChange}
            />
          </div>
          <div className="color-slider">
            <Typography className="color-slider-label">Hue</Typography>
            <Slider
              min={0}
              max={200}
              value={hue}
              valueLabelDisplay="auto"
              onChange={this.handleHueChange}
            />
          </div>
        </div>
        <div>
          { error &&
            <Snackbar open={error != null} autoHideDuration={6000} onClose={() => this.setState({error: undefined})}>
              <SnackbarContent message={error}/>
            </Snackbar>
          }
        </div>
      </div>
    );
  }
}
