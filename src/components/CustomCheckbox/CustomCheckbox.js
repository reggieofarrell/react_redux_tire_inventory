import React, {Component} from 'react';
import classNames from 'classnames';

export default class CustomCheckbox extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      checked: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    if (this.props.checked) {
      this.setState({
        checked: true
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.checked) {
  //     console.log(`${this.props.label} is checked!`)
  //     // this.props.checkedCallback();
  //   }
  //
  //   if (!this.state.checked) {
  //     console.log(`${this.props.label} is un-checked!`)
  //     // this.props.checkedCallback();
  //   }
  // }

  toggle(event) {
    if (!this.state.checked) {
      this.props.checkedCallback();
    } else {
      this.props.uncheckedCallback();
    }

    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const controlIndClass = classNames({
      "custom-control-indicator": true,
      "background-white": (this.props.background === '#fff'),
    });

    const labelClassNames = classNames({
      'custom-control': true,
      'custom-checkbox': true,
      'ml-0': this.props.noLeftMargin
    })

    return (
      <label className={labelClassNames}>
        <input
          type="checkbox"
          onClick={this.toggle}
          className="custom-control-input"
          checked={this.state.checked}
          disabled={this.props.disabled}
        />
        <span className={controlIndClass}></span>
        <span className="custom-control-description">{this.props.label}</span>
      </label>
    );
  }
}
