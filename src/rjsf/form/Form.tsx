import React, {Component, FormEventHandler, ReactNode} from 'react';
import MuiForm from "rjsf-material-ui";
import {Field, UiSchema} from "react-jsonschema-form";
import {JSONSchema6} from "json-schema";
import ColorField from "../fields/ColorField";
import GeometryField from "../fields/GeometryField";
import TagField from "../fields/TagField";

export interface FormProps {

  /** The schema for the JSON data. */
  jsonSchema: JSONSchema6;

  /** The UI schema configuration for React JSONSchema. */
  uiSchema: UiSchema;

  /** The default form-data and context to add to the form. */
  defaultFormData?: object;
}

export interface FormState {

  /** The current state of the form-date and context. */
  formData?: object;
}

export default class Form extends Component<FormProps, FormState> {

  private readonly fields : { [name: string]: Field } = {
    'color': ColorField,
    'geometry': GeometryField,
    'tag': TagField
  };

  public constructor(props: FormProps) {
    super(props);
    this.state = {
      formData: props.defaultFormData
    };
  }

  /** Rerender the components with the formContext. */
  public onChange(): FormEventHandler<HTMLElement> {
    return (event: any) => {
      this.setState({formData: event.formData})
    };
  }

  public render(): ReactNode {
    const formData = this.state.formData;

    return (
      <MuiForm
        schema={this.props.jsonSchema}
        uiSchema={this.props.uiSchema}
        fields={this.fields}
        formData={formData}
        formContext={formData}
        onChange={this.onChange}
      />
    );
  }
}
