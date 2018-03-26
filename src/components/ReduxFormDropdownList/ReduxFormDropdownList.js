import React, { Component } from 'react';
import Select from 'react-select';

class ReduxFormDropdownList extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      value: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ value }) {
    this.props.onChange(value);
  }

  render() {
    const { input, options, value, className } = this.props;

    return (
      <Select
        className={className}
        clearable={false}
        searchable
        options={options}
        {...input}
        onChange={this.handleInputChange}
        value={value}
      />
    );
  }
}

export default ReduxFormDropdownList;
