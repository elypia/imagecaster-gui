import React, {FunctionComponent, ReactNode} from "react";
import {CircularProgress} from "@material-ui/core";

export enum LoadPosition {
  NotLoaded,
  Loading,
  Loaded,
  Failed
}

export interface LoadableProps {
  position: LoadPosition;
  errorMessage: string;
  children: ReactNode;
}

const Loadable: FunctionComponent<LoadableProps> = (props: LoadableProps) => {
  const {position, errorMessage, children} = props;

  switch (position) {
    case LoadPosition.NotLoaded:
      return (
        <div>

        </div>
      );
    case LoadPosition.Loading:
      return (
        <div className="flex-centered">
          <CircularProgress/>
        </div>
      );
    case LoadPosition.Loaded:
      return (
        <div>
          {children}
        </div>
      );
    case LoadPosition.Failed:
      return (
        <div className="flex-centered">
          <p>{errorMessage}</p>
          <p className="large-text">:(</p>
        </div>
      );
    default:
      throw new Error("Unimplemented load position encountered.");
  }
};

export default Loadable;
