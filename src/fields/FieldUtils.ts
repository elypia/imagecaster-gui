export class FieldUtils {

  /**
   * Change the value in the formdata and UI.
   * We can do it this way since everything is a string in this part
   * of the form.
   *
   * @param name The name of the property in the schema.
   * @param field The field implementation this occured in.
   */
  public static onChange(name: string, field: any) : any {
    return (event: any) => {
      field.setState({
        [name]: event.target.value
      }, () => {
        const props : any = field.props;
        props.onChange(field.state)
      })
    };
  }
}
