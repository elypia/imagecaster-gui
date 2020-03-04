import {Component} from "react";
import {FieldProps} from "react-jsonschema-form";

/**
 * Utility methods to perform generic functionality on
 * fields and widgets for React JSONSchema Forms.
 */
export class FieldUtils {

  /**
   * Change the value in the formdata and UI.
   * We can do it this way since everything is a string in this part
   * of the form.
   *
   * @param name The name of the property in the schema.
   * @param field The field implementation this occured in.
   */
  public static setState(name: string, field: Component<FieldProps>) : any {
    return (event: any) => {
      field.setState({
        [name]: event.target.value
      }, () => field.props.onChange(field.state))
    };
  }

  public static setArrayState(name: string, field: Component<FieldProps>) : any {
    return (event: any) => {
      const value = event.target.value;

      field.setState({
        [name]: value
      }, () => field.props.onChange(value))
    };
  }
}
