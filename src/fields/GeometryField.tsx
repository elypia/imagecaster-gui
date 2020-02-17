import React, {ReactNode} from 'react';
import {Dialog, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './GeometryField.css';
import {AxiosResponse} from "axios";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FieldUtils} from "./FieldUtils";

const axios = require('axios').default;

/** Widget that displays metadata tag settings and preview. */
export default class GeometryField extends React.Component {

  public constructor(props: any) {
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

  private closeDiaglog() : any {
    this.setState({'output': undefined})
  }

  // TODO: Use Preview component instead and pass props
  public render(): ReactNode {
    const {geometry, output}: any = this.state;

    return (
      <div className="size-wrapper">
        <TextField className="value-field" value={geometry} label="Geometry" onChange={FieldUtils.onChange('geometry', this)}/>
        <Button variant="contained" onClick={() => this.previewImage(geometry)}>
          <FontAwesomeIcon icon="image"/>
        </Button>
        <div>
        { output &&
          <Dialog open={output != null} onClose={this.closeDiaglog()}>
            <DialogTitle>Preview</DialogTitle>
            <DialogContent className="dialog-content">
              <img src={output} alt='Preview of the input with the filter and geometry specified.'/>
            </DialogContent>
            <DialogActions>
              <Button className="dialog-button"
                      href={output}
                      startIcon={<FontAwesomeIcon icon='download'/>}
                      aria-label="download"
                      download>
                  Download
              </Button>
              <Button className="dialog-button"
                      startIcon={<FontAwesomeIcon icon='times'/>}
                      onClick={this.closeDiaglog()}
                      aria-label="close">
                  Close
              </Button>
            </DialogActions>
          </Dialog>
        }
        </div>
      </div>
    );
  }
}
