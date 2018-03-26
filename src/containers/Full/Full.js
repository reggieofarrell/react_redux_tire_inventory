import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Authorization from '../../HOC/Authorization/Authorization';
import Dashboard from '../../views/Dashboard/';
import Suppliers from '../../views/Suppliers/Suppliers';
import TireBrands from '../../views/TireBrands/TireBrands';
import TirePatterns from '../../views/TirePatterns/TirePatterns';
import TireSizes from '../../views/TireSizes/TireSizes';
import TireModels from '../../views/TireModels/TireModels';
import TraCodes from '../../views/TraCodes/TraCodes';
import RubberCompounds from '../../views/RubberCompounds/RubberCompounds';
import FobLocations from '../../views/FobLocations/FobLocations';
import Avails from '../../views/Avails/Avails';
import PlyRatings from '../../views/PlyRatings/PlyRatings';
import MyAccount from '../../views/MyAccount/MyAccount';
import Users from '../../views/Users/Users';
import IventoryAlert from '../IventoryAlert/IventoryAlert';
// import IventorySwal from '../IventorySwal/IventorySwal';
import SweetAlert from 'react-redux-sweetalert2';

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
                {/* <Route path="/suppliers-dt" name="Suppliers DT" component={SuppliersDT}/> */}
                {/* <Route path="/suppliers-rt" name="Suppliers RT" component={SuppliersRT}/> */}
                <Route path="/suppliers" name="Suppliers" component={Suppliers}/>
                <Route path="/admin/users" name="Users" component={Authorization(Users, ['admin'])}/>
                <Route path="/options/tire-patterns" name="Tire Patterns" component={TirePatterns}/>
                <Route path="/options/tire-brands" name="Tire Brands" component={TireBrands}/>
                <Route path="/options/tire-sizes" name="Tire Sizes" component={TireSizes}/>
                <Route path="/options/tire-models" name="Tire Models" component={TireModels}/>
                <Route path="/options/ply-ratings" name="Ply Ratings" component={PlyRatings}/>
                <Route path="/options/rubber-compounds" name="Rubber Compounds" component={RubberCompounds}/>
                <Route path="/admin/users" name="Ply Ratings" component={PlyRatings}/>
                {/* <Route path="/fob-locations" name="FOB Locations" component={FobLocations}/> */}
                <Route path="/options/tra-codes" name="TRA Codes" component={TraCodes}/>
                <Route path="/avails" name="Avails" component={Avails}/>
                <Route path="/my-account" name="My Account" component={MyAccount}/>
                {/* <Route path="/griddle" name="Griddle" component={GriddleSuppliers}/> */}
                <Redirect from="/" to="/dashboard"/>
              </Switch>
              <IventoryAlert />
              <SweetAlert />
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
