import React, {Component, ReactNode} from 'react';
import MuiForm from "rjsf-material-ui";
import {Field, UiSchema, Widget} from "react-jsonschema-form";
import {JSONSchema6} from "json-schema";
import ColorField from "../fields/ColorField";
import GeometryField from "../fields/GeometryField";
import TagField from "../fields/TagField";
import RangeWidget from "../widgets/RangeWidget";
import PreviewableImage from "../../models/PreviewableImage";

export interface FormContext {

  formData: object

  /** The callback to add images to the preview panel. */
  handleAppendToPreview: (image: PreviewableImage) => void;
}

export interface FormProps {

  /** The schema for the JSON data. */
  jsonSchema: JSONSchema6;

  /** The UI schema configuration for React JSONSchema. */
  uiSchema: UiSchema;

  /** The default form-data and context to add to the form. */
  defaultFormData: object;

  /** The callback to add images to the preview panel. */
  handleAppendToPreview: (image: PreviewableImage) => void;
}

export interface FormState {

  /** The current state of the context. */
  formContext: FormContext;
}

export default class Form extends Component<FormProps, FormState> {

  private readonly fields: { [name: string]: Field } = {
    'color': ColorField,
    'geometry': GeometryField,
    'tag': TagField
  };

  private readonly widgets: { [name: string]: Widget } = {
    'elypia-range': RangeWidget
  };

  public constructor(props: FormProps) {
    super(props);
    this.state = {
      formContext: {
        formData: props.defaultFormData,
        handleAppendToPreview: props.handleAppendToPreview
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  /** Rerender the components with the formContext. */
  public handleFormChange(event: any): void {
    this.setState({
      formContext: {
        formData: event.formData,
        handleAppendToPreview: this.props.handleAppendToPreview
      }
    })
  }

  public render(): ReactNode {
    const {jsonSchema, uiSchema} = this.props;
    const {formContext} = this.state;

    return (
      <MuiForm
        schema={jsonSchema}
        uiSchema={uiSchema}
        fields={this.fields}
        widgets={this.widgets}
        formData={formContext.formData}
        formContext={formContext}
        onChange={this.handleFormChange}
      />
    );
  }
}
