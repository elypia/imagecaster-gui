import React, {ReactNode} from 'react';

/** Widget that displays Modulation settings and preview. */
export default class ModulateWidget extends React.Component {

  public constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {...props.formData};
  }

  public render(): ReactNode {

    return (
      <div>

      </div>
    );
  }
}
