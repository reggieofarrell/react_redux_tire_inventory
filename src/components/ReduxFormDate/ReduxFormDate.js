import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ReduxFormDate extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      value: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.props.onChange(e.format('YYYY-MM-DD'));
  }

  render() {

    const { input, options, value, className } = this.props;

    return (
      <DatePicker
        {...input}
        className={className}
        dateFormat="YYYY-MM-DD"
        // selected={this.state.startDate}
        onChange={this.handleInputChange}
        value={value ? moment(value).format('YYYY-MM-DD') : ''}
      />
    );
  }
}

export default ReduxFormDate;
