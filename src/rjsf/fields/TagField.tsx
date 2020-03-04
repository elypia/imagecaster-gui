import React, {Component, ReactNode} from 'react';
import "./TagField.css"
import {TextField} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {FieldUtils} from "../../utils/FieldUtils";
import {FieldProps} from "react-jsonschema-form";

/** Widget that displays metadata tag settings and preview. */
export default class TagField extends Component<FieldProps> {

  /** An array of all the available tags that can be set. */
  private readonly Tags: string[];

  public constructor(props: FieldProps) {
    super(props);
    this.state = {...props.formData};
    let properties: any = props.schema.properties;

    if (properties)
      this.Tags = properties.tag.enum;
    else
      this.Tags = [];
  }

  /**
   * Checks if we should display the specified tag.
   *
   * @param tagToCheck The tag to check.
   */
  public shouldDisplayTag(tagToCheck: string) : boolean {
    const allConfiguredTags: any[] = this.props.formContext.formData.build.metadata.exif;

    if (!allConfiguredTags)
      return true;

    const allConfiguredTagNames = allConfiguredTags.map((configuredTag) => configuredTag.tag);
    const {tag}: any = this.state;
    return tagToCheck === tag || !allConfiguredTagNames.includes(tagToCheck);
  }

  public render(): ReactNode {
    const {tag, value}: any = this.state;

    // TODO: Make this it's own component or element somehow to group unique tags
    const menuItems: ReactNode[] = this.Tags.filter((tagf) => this.shouldDisplayTag(tagf)).map((tagEnum) => {
      return <MenuItem key={tagEnum} value={tagEnum}>{tagEnum}</MenuItem>
    });

    return (
      <div className="tag-field">
        <InputLabel id="select-tag">Tag</InputLabel>
        <Select labelId="select-tag" className="select-tag-field" defaultValue={tag} onChange={FieldUtils.setState('tag', this)}>
          {menuItems}
        </Select>
        <TextField className="value-field" defaultValue={value} label="Value" onChange={FieldUtils.setState('value', this)}/>
      </div>
    );
  }
}
