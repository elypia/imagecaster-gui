import React, {FunctionComponent} from 'react';
import ReactMarkdown from 'react-markdown';

interface DocumentationProps {

}

const Documentation: FunctionComponent<DocumentationProps> = (props: DocumentationProps) => {
  const markdown: string =
  `
  # Geometry 
  This is a summary of how to specify Geometry in ImageCaster, for more information
  you can go [here](https://www.imagemagick.org/Usage/resize/#resize) to read more 
  information on how resizing works, and the syntax and modifiers you can apply.  
  
  Specify \`1920\` to export with a width of 1,920 pixels, or specify x1080 to export
  with a height of 1,080 pixels. You can also specify 1920x1080 to export with 
  with the constraints of 1,920x1,080 pixels; this will not stretch or distort the image.
  Specifying dimensions without any modifiers essentially creates a box or set of constraints
  the entire image must fit inside of.  
  
  You can specify the \`!\` modifier at the end to scrap aspect ratio, this will allow
  skewing the result of the image.  
  
  You can specify the \`>\` modifier at the end to never enlarge an image, for example
  if you have many images to export, and they should all be exported at 512 pixels,
  you can specify \`512>\` which means make everything 512 pixels wide, but if the image
  is _under_ that, export it as is. (You can also do the opposite with \`<\`.)  
  
  You can specify the \`^\` modifier to make images fill an area, unlike the standard
  resize syntax without modifiers which will fit images inside the constraints, this
  will fill the constraints and may crop equally from the north/south, or east/west side 
  of the image.  
  
  You can specify the \`@\` modifier to specify a total number of pixels rather than a size,
  this is useful for when you want to ensure all images are a consistent size, but not fussed
  if they're the same resolution or aspect ratio, for example if you specify \`2073600@\`,
  you'll have an image with the number of pixels in 1920x1080, but it could be any size or 
  aspect ratio.  
  
  You can also specify percentages instead of pixels if that's preferred.
  `;

  return (
    <ReactMarkdown source={markdown}/>
  );
};

export default Documentation;
