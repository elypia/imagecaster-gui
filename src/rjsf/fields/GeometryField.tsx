import React, {Component, FormEventHandler, ReactNode} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './GeometryField.css';
import axios, {AxiosResponse} from "axios";
import {FieldUtils} from "../../utils/FieldUtils";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {FieldProps} from "react-jsonschema-form";

/** Widget that displays metadata tag settings and preview. */
export default class GeometryField extends Component<FieldProps> {

  public constructor(props: FieldProps) {
    super(props);
    this.state = {
      'geometry': props.formData
    };
  }

  /**
   * Take an image from the input and resize it according
   * to the resize parameter.
   *
   * @param geometry The resize string.
   * @returns The preview image to show users.
   */
  public previewImage(geometry: string) : any {
    console.debug('Clicked preview button for resize.');

    const props: any = this.props;
    const exportContext: any = props.formContext.export;

    const input: string = exportContext.input;

    if (!input) {
      this.setState({'error': 'Unable to preview without input image.'});
      console.info('Stopped performing preview image action due to no input.');
      return;
    }

    const metaInput: string[] = input.split(',');
    const filter: string = exportContext.resize.filter;

    const formData: FormData = new FormData();
    formData.append('image', metaInput[1]);
    formData.append('filter', filter);
    formData.append('geometry', geometry);

    console.info('Previewing image with the following filter and geometery: (%s) (%s)', filter, geometry);

    axios.post('http://localhost:5000/preview/resize', formData)
      .then((resp: AxiosResponse) => {
        this.setState({
          'output': metaInput[0] + ',' + resp.data
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  public onClick(): FormEventHandler<HTMLElement> {
    return () => {
      const {geometry}: any = this.state;
      this.previewImage(geometry);
    };
  }

  public render(): ReactNode {
    let {geometry, error}: any = this.state;

    return (
      <div className="geometry-wrapper">
        <TextField className="value-field"
                   value={geometry}
                   label="Geometry"
                   onChange={FieldUtils.setState('geometry', this)}/>
        <Button variant="contained" onClick={this.onClick}>
          <FontAwesomeIcon icon="image"/>
        </Button>
        <div>
          { error &&
            <Snackbar open={error != null} autoHideDuration={6000} onClose={() => this.setState({'error': undefined})}>
              <SnackbarContent message={error}/>
            </Snackbar>
          }
        </div>
      </div>
    );
  }
}
