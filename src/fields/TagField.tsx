import React, {ReactNode} from 'react';
import {TextField} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import "./TagField.css"
import {FieldUtils} from "./FieldUtils";

/** Widget that displays metadata tag settings and preview. */
export default class TagField extends React.Component {

  /** An array of all the available tags that can be set. */
  private readonly Tags: string[];

  /** Get a readonly view of the underlying properties. */
  readonly props: any;

  public constructor(props: any) {
    super(props);
    this.state = {...props.formData};
    this.Tags = props.schema.properties.tag.enum;
  }

  /**
   * Checks if we should display the specified tag.
   *
   * @param tagToCheck The tag to check.
   */
  public shouldDisplayTag(tagToCheck: string) : boolean {
    const allConfiguredTags: any[] = this.props.formContext.export.metadata.exif.tags;
    const allConfiguredTagNames = allConfiguredTags.map((configuredTag) => configuredTag.tag);
    const {tag}: any = this.state;
    return tagToCheck === tag || !allConfiguredTagNames.includes(tagToCheck);
  }

  public render(): ReactNode {
    const {tag, value}: any = this.state;

    const menuItems: ReactNode[] = this.Tags.filter((tagf) => this.shouldDisplayTag(tagf)).map((tagEnum) => {
      return <MenuItem key={tagEnum} value={tagEnum}>{tagEnum}</MenuItem>
    });

    return (
      <div>
        <InputLabel id="select-tag">Tag</InputLabel>
        <Select labelId="select-tag" className="select-tag-field" value={tag} onChange={FieldUtils.onChange('tag', this)}>
          {menuItems}
        </Select>
        <TextField className="value-field" value={value} label="Value" onChange={FieldUtils.onChange('value', this)}/>
      </div>
    );
  }
}
