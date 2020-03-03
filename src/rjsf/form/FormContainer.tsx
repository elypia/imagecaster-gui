import React, {Component, ReactNode} from 'react';
import './FormContainer.css'
import {JSONSchema6} from "json-schema";
import {UiSchema} from "react-jsonschema-form";
import axios, {AxiosError, AxiosResponse} from 'axios';
import Form from "./Form";
import PreviewableImage from "../../models/PreviewableImage";
import Loadable, {LoadPosition} from "../../library/Loadable";

interface FormContainerProps {

  /** The callback to add images to the preview panel. */
  handleAppendToPreview: (image: PreviewableImage) => void;
}

interface FormContainerState {

  /** If the container has finished loading yet. */
  loadPosition: LoadPosition;

  /** The JSON schema to generate the form for. */
  schema?: JSONSchema6;

  /** The form data to set on the form by default. */
  formData?: unknown;
}

export default class FormContainer extends Component<FormContainerProps, FormContainerState> {

  private readonly uiSchema: UiSchema = {
    build: {
      metadata: {
        exif: {
          'ui:options': {
            orderable: false,
          },
          items: {
            'ui:field': 'tag'
          }
        },
        iptc: {
          'ui:options': {
            orderable: false,
          },
          items: {
            'ui:field': 'tag'
          }
        }
      },
      resize: {
        geometries: {
          'ui:options': {
            orderable: false,
          },
          items: {
            'ui:field': 'geometry',
          }
        }
      },
      recolor: {
        modulation: {
          'ui:options': {
            orderable: false,
          },
          items: {
            'ui:field': 'color',
            brightness: {
              'ui:widget': 'elypia-range',
              'ui:emptyValue': 100
            },
            saturation: {
              'ui:widget': 'elypia-range',
              'ui:emptyValue': 100
            },
            hue: {
              'ui:widget': 'elypia-range',
              'ui:emptyValue': 100
            }
          }
        },
        'ui:options': {
          orderable: false
        }
      }
    }
  };

  public constructor(props: FormContainerProps) {
    super(props);
    this.state = {
      loadPosition: LoadPosition.Loading
    };
  }

  public componentDidMount() : void {
    const search: string = window.location.search;
    const params: URLSearchParams = new URLSearchParams(search);
    const formData: string | null = params.get('form-data');
    const formDataJson: object = JSON.parse(formData || '{}');

    const form: string = params.get('form') || 'build';

    console.debug("FormData set to:\n", formDataJson);

    axios.get(`http://localhost:5000/schema/json-schema?properties=${form}`)
      .then((resp: AxiosResponse) => {
        console.debug('Finshed loading ImageCaster schema.');
        this.setState({
          schema: resp.data,
          loadPosition: LoadPosition.Loaded,
          formData: formDataJson
        });
      })
      .catch((error: AxiosError) => {
        console.error(error);
        this.setState({
          loadPosition: LoadPosition.Failed,
        });
      });
  }

  public render(): ReactNode {
    const {loadPosition, schema, formData} = this.state;

    return (
      <div>
        <Loadable position={loadPosition} errorMessage="Failed to initialize application.">
          <Form
            jsonSchema={schema as JSONSchema6}
            uiSchema={this.uiSchema}
            defaultFormData={formData as object}
            handleAppendToPreview={this.props.handleAppendToPreview}
          />
        </Loadable>
      </div>
    );
  }
}
