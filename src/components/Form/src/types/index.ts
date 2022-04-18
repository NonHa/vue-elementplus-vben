type ColSpanType = number;
export interface ColEx {
  style?: any;
  /**
   * raster number of cells to occupy, 0 corresponds to display: none
   * @default none (0)
   * @type ColSpanType
   */
  span: number;

  /**
   * raster order, used in flex layout mode
   * @default 0
   * @type ColSpanType
   */
  // order?: ColSpanType;

  /**
   * the layout fill of flex
   * @default none
   * @type ColSpanType
   */
  // flex?: ColSpanType;

  /**
   * the number of cells to offset Col from the left
   * @default 0
   * @type ColSpanType
   */
  offset?: ColSpanType;

  /**
   * the number of cells that raster is moved to the right
   * @default 0
   * @type ColSpanType
   */
  push?: ColSpanType;

  /**
   * the number of cells that raster is moved to the left
   * @default 0
   * @type ColSpanType
   */
  pull?: ColSpanType;

  /**
   * <576px and also default setting, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥576px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥768px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥992px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1200px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1600px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  // xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;
}

export type ComponentType =
  | 'ElInput'
  | 'ElInputGroup'
  | 'ElInputPassword'
  | 'ElInputSearch'
  | 'ElInputTextArea'
  | 'ElInputNumber'
  | 'ElInputCountDown'
  | 'ElSelect'
  | 'ElApiSelect'
  | 'ElTreeSelect'
  | 'ElApiTree'
  | 'ElApiTreeSelect'
  | 'ElApiRadioGroup'
  | 'ElRadioButtonGroup'
  | 'ElRadioGroup'
  | 'ElCheckbox'
  | 'ElCheckboxGroup'
  | 'ElAutoComplete'
  | 'ElApiCascader'
  | 'ElCascader'
  | 'ElDatePicker'
  | 'ElMonthPicker'
  | 'ElRangePicker'
  | 'ElWeekPicker'
  | 'ElTimePicker'
  | 'ElSwitch'
  | 'ElStrengthMeter'
  | 'ElUpload'
  | 'ElIconPicker'
  | 'ElRender'
  | 'ElSlider'
  | 'ElRate'
  | 'ElDivider';
