import React, {ReactNode} from 'react';
import './Preview.css';
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";

/** The navigation bar for this application. */
export default class Preview extends React.Component {

  public constructor(props: any) {
    super(props);

    this.setState({
      'output': props.output,
    });
  }

  public render(): ReactNode {
    const {output} : any = this.state;

    return (
        <Dialog open={output != null} onClose={() => this.setState({'output': undefined})}>
            <DialogTitle>Preview Size</DialogTitle>
            <DialogContent>
                <img src={output} alt='Preview of the input with the filter and geometry specified.'/>
            </DialogContent>
            <DialogActions>
                <Button href={output} startIcon={<FontAwesomeIcon icon='download'/>} aria-label="download" download>
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );
  }
}
