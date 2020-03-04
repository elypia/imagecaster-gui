import React, {Component, ReactNode} from 'react';
import './Preview.css'
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PreviewableImage from "../models/PreviewableImage";
import ImagePreview from "./ImagePreview";

interface PreviewState {

  /** The currently focused/displayed image. */
  selected: PreviewableImage | undefined;
}

export interface PreviewProps {

  /** An array of all previewable images displayed. */
  images: PreviewableImage[];

  /** The callback to remove an image by index from the image array. */
  handleRemoveImage: (index: number) => void;
}

/** The navigation bar for this application. */
export default class Preview extends Component<PreviewProps, PreviewState> {

  public constructor(props: PreviewProps) {
    super(props);

    if (props.images) {
      this.state = {
        selected: props.images[0]
      };
    }

    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  private handleSelectImage(image: PreviewableImage) : void {
    this.setState({
      selected: image
    })
  }

  public render(): ReactNode {
    const {handleRemoveImage} = this.props;
    const {selected} = this.state;

    const listItems: ReactNode[] = this.props.images.slice().reverse().map((image: PreviewableImage) => {
      return (
        <li className="preview-image" key={image.id}>
          <ImagePreview image={image} handleRemoveImage={handleRemoveImage} handleSelectImage={this.handleSelectImage}/>
        </li>
      );
    });

    return (
      <div id="preview-wrapper">
        <div id="preview-focused-image">
          { selected &&
            <div id="preview-focused-image-selected">
              <div
                id="preview-focused-image-canvas"
                className="checkered-background"
              >
                <img
                  id="preview-focused-image-canvas-image"
                  src={selected.data}
                  alt='Preview of the input with the filter and geometry specified.'
                />
              </div>
              <div id="preview-focused-image-actions">
                <Button className="dialog-button"
                        href={selected.data}
                        startIcon={<FontAwesomeIcon icon='download'/>}
                        aria-label="download"
                        download>
                  Save
                </Button>
                <Button className="dialog-button"
                        startIcon={<FontAwesomeIcon icon='times'/>}
                        onClick={() => this.setState({selected: undefined})}
                        aria-label="close">
                  Close
                </Button>
              </div>
            </div>
          }
          { !selected &&
            <p>There is no focused preview to display right now.</p>
          }
        </div>
        <ul id="preview-previously-previewed-pane">
          {listItems}
        </ul>
      </div>
    );
  }
}
