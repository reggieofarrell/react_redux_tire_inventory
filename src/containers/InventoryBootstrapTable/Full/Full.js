import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Authorization from '../../HOC/Authorization';
import Dashboard from '../../views/Dashboard/';
import Suppliers from '../../views/Suppliers';
import TireBrands from '../../views/TireBrands';
import TirePatterns from '../../views/TirePatterns';
import TireSizes from '../../views/TireSizes';
import TireModels from '../../views/TireModels';
import TraCodes from '../../views/TraCodes';
import RubberCompounds from '../../views/RubberCompounds';
import FobLocations from '../../views/FobLocations';
import Avails from '../../views/Avails';
import PlyRatings from '../../views/PlyRatings';
import MyAccount from '../../views/MyAccount';
import Users from '../../views/Users';
import IventoryAlert from '../IventoryAlert';

class Full extends Component {

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/suppliers" name="Suppliers" component={Suppliers}/>
                <Route path="/admin/users" name="Users" component={Authorization(Users, ['admin'])}/>
                <Route path="/options/tire-patterns" name="Tire Patterns" component={TirePatterns}/>
                <Route path="/options/tire-brands" name="Tire Brands" component={TireBrands}/>
                <Route path="/options/tire-sizes" name="Tire Sizes" component={TireSizes}/>
                <Route path="/options/tire-models" name="Tire Models" component={TireModels}/>
                <Route path="/options/ply-ratings" name="Ply Ratings" component={PlyRatings}/>
                <Route path="/options/rubber-compounds" name="Rubber Compounds" component={RubberCompounds}/>
                <Route path="/admin/users" name="Ply Ratings" component={PlyRatings}/>
                <Route path="/options/tra-codes" name="TRA Codes" component={TraCodes}/>
                <Route path="/avails" name="Avails" component={Avails}/>
                <Route path="/my-account" name="My Account" component={MyAccount}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
              <IventoryAlert />
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
