import * as React from 'react';

interface EditableProps {
  isEditable: boolean;
  isMultiline?: boolean;
  placeholder: string;
  value: any;
  values?: any[];
  spanStyle?: Object;
  inputStyle?: Object;
  spanClassName?: string;
  inputClassName?: string;
  valueFromString?(value: string, values: any[]): any;
  valueToString?(value: any): string;
  valueComparer?(value1: any, value2: any): boolean;
  onValueChanged(value: any): void;
}

export class Editable extends React.Component<EditableProps, {}> {
  private containerElement: Element;
  private spanElement: Element;
  private inputElement: Element;
  private focused: boolean;

  onKeyDown(event: KeyboardEvent) {
    if (event.which !== 27)
      return;

    this.endEditing();
  }

  onKeyPress(event: KeyboardEvent) {
    if (!this.props.isMultiline) {
      if (event.which !== 13)
        return;
    }
    else {
      if (event.which !== 13 || !event.ctrlKey)
        return;
    }

    //- if (this.focused)
    //-   return;

    var value = $(this.inputElement).val();

    if (this.props.values)
      value = this.props.valueFromString(value, this.props.values);

    this.onValueChanged(value);
    this.endEditing();
  }

  startEditing() {
    if (!this.props.isEditable)
      return;

    this.focused = false;

    $(this.containerElement).addClass('editing');

    if (!this.props.isMultiline)
      $(this.inputElement).css({'min-width': $(this.spanElement).width()});
    else
      ($(this.inputElement) as any).textareaAutoSize();

    $(this.inputElement)
      .val(this.props.valueToString(this.props.value))
      .select()
      .focus();

    if (this.props.isMultiline)
      $(this.inputElement).trigger('input');

    if (this.props.values) {
      $(this.inputElement)
        .autocomplete({
          source: _.map(this.props.values, this.props.valueToString),
          delay: 0,
          minLength: 0,
          focus(event, ui) {
            this.focused = true;
          },
          select: (event, ui) => {
            var value = this.props.valueFromString(ui.item.value, this.props.values);
            this.onValueChanged(value);
            this.endEditing();
          }
        })
        .autocomplete('search', '');
    }
  }

  endEditing() {
    $(this.containerElement).parent().focus();
    $(this.containerElement).removeClass('editing');
  }

  onValueChanged(value: any) {
    if (this.props.valueComparer(value, this.props.value))
      return;

    this.props.onValueChanged(value);
  }

  render() {
    var value = this.props.value;
    var spanElement: any;
    var inputElement: any;

    if (value)
      spanElement = <span className={this.props.spanClassName} style={this.props.spanStyle} ref={(ref) => this.spanElement = ref}>{this.props.valueToString(value)}</span>
    else
      spanElement = <span className='placeholder' style={this.props.spanStyle} ref={(ref) => this.spanElement = ref}>{this.props.placeholder}</span>

    if (!this.props.isMultiline)
      inputElement = <input className='input' style={this.props.inputStyle} onKeyDown={this.onKeyDown.bind(this)} onKeyPress={this.onKeyPress.bind(this)} onBlur={this.endEditing.bind(this)} ref={(ref) => this.inputElement = ref} />
    else
      inputElement = <textarea className='input' style={this.props.inputStyle} onKeyDown={this.onKeyDown.bind(this)} onKeyPress={this.onKeyPress.bind(this)} onBlur={this.endEditing.bind(this)} ref={(ref) => this.inputElement = ref} />

    return (
      <div className='editable' onDoubleClick={this.startEditing.bind(this)} ref={(ref) => this.containerElement = ref}>
        { spanElement }
        { inputElement }
      </div>
    );
  }
}