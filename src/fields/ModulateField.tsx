import React, {ReactNode} from 'react';

/** Widget that displays modulation settings and preview. */
export default class ModulateField extends React.Component {

  public constructor(props: any) {
    super(props);
    this.state = {...props.formData};
  }

  public render(): ReactNode {

    return (
      <div>

      </div>
    );
  }
}
