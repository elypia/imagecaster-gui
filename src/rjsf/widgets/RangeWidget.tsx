import React, {FC} from "react";
import './RangeWidget.css'
import {WidgetProps} from "react-jsonschema-form";
import {rangeSpec} from "react-jsonschema-form/lib/utils";
import {Typography} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

const RangeWidget: FC<WidgetProps> = (props: WidgetProps) => {
  const {
    label,
    id,
    value,
    readonly,
    disabled,
    options,
    schema,
    onBlur,
    onFocus,
    onChange
  } = props;

  const defaultValue: any = value || schema.default;
  const sliderProps = { label, id, ...rangeSpec(schema) };

  const _onChange = (event: any, value: any) => onChange(value === '' ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => onBlur(id, value);
  const _onFocus = ({target: { value } }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  return (
    <div className="color-slider">
      <Typography id={id} className="color-slider-label">{label}</Typography>
      <Slider
        {...sliderProps}
        defaultValue={defaultValue}
        disabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default RangeWidget;
