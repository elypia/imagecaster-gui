import React, {Component, ReactNode} from 'react';
import './MainPanel.css'
import InfoPanel from "../info-panel/InfoPanel";
import FormContainer from "../../rjsf/form/FormContainer";
import {Divider} from "@material-ui/core";
import PreviewableImage from "../../models/PreviewableImage";

interface MainPanelProps {

}

interface MainPanelState {

  /** All images that are previewable. */
  images: PreviewableImage[];
}

export default class MainPanel extends Component<MainPanelProps, MainPanelState> {

  public constructor(props: MainPanelProps) {
    super(props);
    this.state = {
      images: []
    };

    this.handleAppendToPreview = this.handleAppendToPreview.bind(this);
    this.handleRemoveFromPreview = this.handleRemoveFromPreview.bind(this);
  }

  /**
   * When the preview button is clicked, add the
   * resulting image to the preview list to display
   * in the preview panel.
   */
  public handleAppendToPreview(image: PreviewableImage) : void {
    const {images} = this.state;

    images.push(image);

    this.setState({
      images: images
    }, () => console.info("The images array now contains %s images.", images.length))
  }

  public handleRemoveFromPreview(id: number) : void {
    const {images} = this.state;
    const remainingImages = images.filter((image) => image.id !== id);

    this.setState({
      images: remainingImages
    }, () => console.info('Removed image with ID %s from preview images array.', id))
  }

  public render() : ReactNode {
    const {images} = this.state;

    return (
      <div id="main-panel-wrapper">
        <div id="app-root-form">
          <FormContainer handleAppendToPreview={this.handleAppendToPreview}/>
        </div>
        <Divider orientation="vertical" flexItem />
        <div id="app-root-info-panel">
          <InfoPanel images={images} handleRemoveImage={this.handleRemoveFromPreview}/>
        </div>
      </div>
    );
  }
}
