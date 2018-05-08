import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span> &copy; {new Date().getFullYear()} Tire Inventory</span>
      </footer>
    )
  }
}

export default Footer;
