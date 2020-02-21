import React, {Component, ReactNode} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {CircularProgress} from "@material-ui/core";
import Form from "./Form";
import {UiSchema} from "react-jsonschema-form";
import {JSONSchema6} from "json-schema";

interface FormContainerState {

  /** If the container has finished loading yet. */
  loaded: boolean;

  /** The JSON schema to generate the form for. */
  schema?: JSONSchema6;

  /** The form data to set on the form by default. */
  formData?: unknown;
}

export default class FormContainer extends Component<any, FormContainerState> {

  private readonly uiSchema: UiSchema = {
    export: {
      metadata: {
        exif: {
          tags: {
            items: {
              // 'ui:field': 'tag',
            },
            'ui:options': {
              orderable: false,
            }
          }
        }
      },
      resize: {
        geometries: {
          items: {
            // 'ui:field': 'geometry',
          },
          'ui:options': {
            orderable: false,
          }
        }
      },
      colors: {
        modulate: {
          items: {
            // 'ui:field': 'color',
            brightness: {
              'ui:emptyValue': 100
            },
            saturation: {
              'ui:emptyValue': 100
            },
            hue: {
              'ui:emptyValue': 100
            }
          },
          'ui:options': {
            orderable: false
          }
        }
      }
    },
  };

  public constructor(props: any) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  public componentDidMount() : void {
    const search: string = window.location.search;
    const params: URLSearchParams = new URLSearchParams(search);
    const formData: string | null = params.get('form-data');
    const formDataJson: object = JSON.parse(formData || '{}');

    const form: string = params.get('form') || 'export';

    console.debug("FormData set to:\n", formDataJson);

    axios.get(`http://localhost:5000/schema?form=${form}`)
      .then((resp: AxiosResponse) => {
        console.debug('Finshed loading ImageCaster schema.');
        this.setState({
          schema: resp.data,
          loaded: true,
          formData: formDataJson
        });
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  public render(): ReactNode {
    const {loaded, schema, formData}: any = this.state;

    if (!loaded) {
      return (
        <CircularProgress/>
      );
    }

    return (
      <Form
        jsonSchema={schema}
        uiSchema={this.uiSchema}
        defaultFormData={formData}
      />
    );
  }
}
