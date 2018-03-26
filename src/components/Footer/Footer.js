import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span> &copy; {new Date().getFullYear()} Tire Inventory</span>
        {/* <span className="ml-auto">Powered by <a href="http://coreui.io" target="_blank">CoreUI</a></span> */}
      </footer>
    )
  }
}

export default Footer;
