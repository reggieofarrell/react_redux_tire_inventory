import React, { Component } from 'react';
import { connect } from 'react-redux';

// const Authorization = (WrappedComponent, allowedRoles) => {
//   return class WithAuthorization extends Component {
//
//     render() {
//       const { role } = this.props;
      // if (allowedRoles.includes(role)) {
      //   return <WrappedComponent {...this.props} />
      // } else {
//         return <h1>Not Authorized!</h1>
//       }
//     }
//   }
// }
//
// function mapStateToProps({user}) {
//   return { role: user.data.Role }
// }

export default function(ComposedComponent, allowedRoles) {
  class Authentication extends Component {
    // static contextTypes = {
    //   router: React.PropTypes.object
    // }

    componentWillMount() {
      if (!allowedRoles.includes(this.props.role)) {
        this.props.history.push('/');
      }
    }

    // componentWillUpdate(nextProps) {
    //   if (!nextProps.authenticated) {
    //     this.context.router.history.push('/');
    //   }
    // }

    render() {
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps({user}) {
    return {role: user.data.Role}
  }

  return connect(mapStateToProps)(Authentication);
}

// export default connect(mapStateToProps)(Authorization);
