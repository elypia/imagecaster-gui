import React, {ReactNode} from 'react';
import ModulateField from "../fields/ModulateField";
import TagField from "../fields/TagField";
import MuiForm from "rjsf-material-ui";
import {AxiosResponse} from "axios";
import GeometryField from "../fields/GeometryField";

const axios = require('axios').default;

/** UI properties for how the JSON schema form is displayed. */
const uiSchema = require('../imagecaster.uischema.json');

export default class Export extends React.Component {

  private initialLoad: boolean = false;

  private readonly fields : { [name: string]: any; } = {
    "modulate": ModulateField,
    "geometry": GeometryField,
    "tag": TagField,
  };

  public componentDidMount() : void {
    if (!this.initialLoad) {
      const search: string = window.location.search;
      const params: URLSearchParams = new URLSearchParams(search);
      const formData: string | null = params.get('form-data');
      const formDataJson: object = JSON.parse(formData || '{}');

      console.debug("FormData set to:\n", formDataJson);

      this.setState({
        "formData": formDataJson
      });

      axios.get('http://localhost:5000/schema/export')
        .then((resp: AxiosResponse) => {
          console.debug('Finshed loading ImageCaster schema.');
          this.setState({
            "schema": resp.data
          });
        })
        .catch((error: any) => {
          console.error(error);
        });

      this.initialLoad = true;
    }
  }

  public render(): ReactNode {
    if (!this.state || !this.initialLoad)
      return null;

    const {schema, formData}: any = this.state;

    return (
      <div>
        { schema &&
          <MuiForm schema={schema}
                   uiSchema={uiSchema}
                   formData={formData}
                   formContext={formData}
                   fields={this.fields}
                   onChange={(e) => this.setState({"formData": e.formData})}/>
        }
      </div>
    );
  }
}
