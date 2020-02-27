import React, {FC} from "react";
import './ImagePreview.css'
import PreviewableImage from "../models/PreviewableImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface ImagePreviewProps {

  image: PreviewableImage;

  /** The callback to remove an image by index from the image array. */
  handleRemoveImage: (id: number) => void;

  /** The callback to focus an image. */
  handleSelectImage: (image: PreviewableImage) => void;
}

const ImagePreview: FC<ImagePreviewProps> = (props: ImagePreviewProps) => {
  const {image, handleRemoveImage, handleSelectImage} = props;

  return (
    <div className="image-preview-wrapper">
      <img
        className="checkered-background"
        src={image.data}
        alt="Preview generated by ImageCaster."
        width={64}
        height={64}
        onClick={() => handleSelectImage(image)}
      />
      <div className="image-preview-actions">
        <FontAwesomeIcon
          icon='trash-alt'
          onClick={() => handleRemoveImage(image.id)}
        />
      </div>
    </div>
  );
};

export default ImagePreview;