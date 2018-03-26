import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from 'reactstrap';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import NumericLabel from 'react-pretty-numbers';


class AvgCostModal extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      avgCost: 0
    };

    this.getAvgCost = this.getAvgCost.bind(this);
    this.getTrimmedAvgCost = this.getTrimmedAvgCost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('avg cost modal next props', nextProps);
    if (this.state.avgCost !== nextProps.avgCost) {
      this.setState({avgCost: nextProps.avgCost});
    }
  }

  getTrimmedAvgCost() {
    const filteredResults = this.props.getFilteredResults();
    const unitCosts = filteredResults.map(record => +record.Cost);
    const topCost = Math.max(...unitCosts);
    // console.log('top cost', topCost);
    const bottomCost = Math.min(...unitCosts);
    // console.log('bottom cost', bottomCost);

    const trimmedResults =  filteredResults.filter(record => +record.Cost < topCost && +record.Cost > bottomCost);

    const trimmedTotalCosts = trimmedResults.map(record => +record.TotalCost);
    // console.log('trimmed costs', costs);
    const combinedTotalCost = trimmedTotalCosts.reduce((a, b) => a + b, 0);
    // console.log('trimmed combinedTotalCost', combinedTotalCost);
    // const numRecords = trimmedTotalCosts.length;
    const qtys = trimmedResults.map(record => +record.Quantity);
    const numRecords = qtys.reduce((a, b) => a + b, 0);
    // console.log('trimmed numRecords', numRecords);
    const avgCost = (+combinedTotalCost / +numRecords).toFixed(2);

    this.setState({avgCost: avgCost});
  }

  getAvgCost() {
    const filteredResults = this.props.getFilteredResults();
    const costs = filteredResults.map(record => +record.TotalCost);
    // console.log('costs', costs);
    const combinedCost = costs.reduce((a, b) => a + b, 0);
    // console.log('combinedCost', combinedCost);
    // const numRecords = costs.length;
    const qtys = filteredResults.map(record => +record.Quantity);
    const numRecords = qtys.reduce((a, b) => a + b, 0);
    // console.log('numRecords', numRecords);
    const avgCost = (+combinedCost / +numRecords).toFixed(2);

    this.setState({ avgCost: avgCost });
  }

  render() {
    // console.log('avgCost in modal', this.state.avgCost.toLocaleString());
    // const displayCost = this.state.avgCost.toLocaleString();
    return (
      <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} >
        <ModalHeader toggle={this.props.toggle} >Average Cost</ModalHeader>
        <ModalBody>
          <h4>
            <NumericLabel params={{
              currency: true,
              justification: 'L',
              commafy: true,
              precision: 2,
            }}>
              {this.state.avgCost}
            </NumericLabel>
          </h4>
          <br/>
          <CustomCheckbox
            label="Remove top and bottom prices"
            // background="#fff"
            checkedCallback={this.getTrimmedAvgCost}
            uncheckedCallback={this.getAvgCost}
            noLeftMargin
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default AvgCostModal;
