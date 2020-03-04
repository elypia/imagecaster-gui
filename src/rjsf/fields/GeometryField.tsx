import React, {Component, ReactNode} from 'react';
import './GeometryField.css';
import {FieldProps} from "react-jsonschema-form";
import {TextField} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios, {AxiosError, AxiosResponse} from "axios";
import {FieldUtils} from "../../utils/FieldUtils";
import ResizeRequest from "../../models/requests/ResizeRequest";
import PreviewableImage from "../../models/PreviewableImage";
import ResizeAllFiltersRequest from "../../models/requests/ResizeAllFiltersRequest";

interface GeometryState {

  /** The current geometry specified in the field. */
  geometry?: string;

  /** The error message to display in the snackbar. */
  error?: string;
}

/** Widget that displays metadata tag settings and preview. */
export default class GeometryField extends Component<FieldProps<string>, GeometryState> {

  public constructor(props: FieldProps) {
    super(props);
    this.state = {
      geometry: props.formData
    };

    this.handleResizePreview = this.handleResizePreview.bind(this);
    this.handleResizePreviewAllFilters = this.handleResizePreviewAllFilters.bind(this);
  }

  private isValidRequest(geometry: string | undefined, inputArray: string[]) : boolean {
    if (!geometry) {
      this.setState({
        error: 'Geometry not specified.'
      });

      return false;
    }

    if (!inputArray) {
      this.setState({error: 'Unable to preview without input image.'});
      console.info('Stopped performing preview image action due to no input. (inputArray: %s)', inputArray);
      return false;
    }

    const input: string = inputArray[0];

    if (!input) {
      this.setState({error: 'Invalid file provided to image array.'});
      console.warn('Something went wrong while processing the images. (input: %s)', input);
      return false;
    }

    return true;
  }

  /**
   * Take an image from the input and resize it according
   * to the resize parameter.
   */
  private handleResizePreview() : void {
    console.debug('Clicked preview button for resize.');
    const {geometry} = this.state;
    const build = this.props.formContext.formData.build;
    const inputArray: string[] = build.input;

    if (!this.isValidRequest(geometry, inputArray))
      return;

    const input: string = inputArray[0];
    const filter: string = build.resize.filter;

    let resize: ResizeRequest = {
      image: input,
      filter: filter,
      geometry: geometry as string
    };

    this.requestPreview(resize, 'http://localhost:5000/preview/resize');
  }

  /**
   * Take an image from the input and resize against
   * all filters side by side.
   */
  private handleResizePreviewAllFilters() : void {
    console.debug('Clicked preview button for resize with all filters.');
    const {geometry} = this.state;
    const build = this.props.formContext.formData.build;
    const inputArray: string[] = build.input;

    if (!this.isValidRequest(geometry, inputArray))
      return;

    const input: string = inputArray[0];

    let resize: ResizeAllFiltersRequest = {
      image: input,
      geometry: geometry as string
    };

    this.requestPreview(resize, 'http://localhost:5000/preview/resize-all-filters');
  }

  private requestPreview(request: ResizeAllFiltersRequest, url: string) : void {
    const {geometry} = request;
    console.info('Previewing image with the following geometery: (%s)', geometry);

    axios.post(url, request)
      .then((resp: AxiosResponse) => {
        console.log('Completed request and received preview succesfully.');
        const timestamp: Date = new Date();

        const previewableImage: PreviewableImage = {
          id: timestamp.getTime(),
          data: resp.data,
          timestamp: timestamp,
          parameters: {
            geometry: geometry
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

  public render(): ReactNode {
    let {geometry, error} = this.state;

    return (
      <div className="geometry-wrapper">
        <TextField className="value-field"
                   type="text"
                   defaultValue={geometry}
                   label="Geometry"
                   onChange={FieldUtils.setArrayState('geometry', this)}/>
        <Button variant="contained" onClick={this.handleResizePreview}>
          <FontAwesomeIcon icon="eye"/>
        </Button>
        <Button variant="contained" onClick={this.handleResizePreviewAllFilters}>
          <FontAwesomeIcon icon="eye"/>
        </Button>
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
