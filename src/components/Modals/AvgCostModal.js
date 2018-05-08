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
    if (this.state.avgCost !== nextProps.avgCost) {
      this.setState({avgCost: nextProps.avgCost});
    }
  }

  getTrimmedAvgCost() {
    const filteredResults = this.props.getFilteredResults();
    const unitCosts = filteredResults.map(record => +record.Cost);
    const topCost = Math.max(...unitCosts);
    const bottomCost = Math.min(...unitCosts);
    const trimmedResults =  filteredResults.filter(record => +record.Cost < topCost && +record.Cost > bottomCost);
    const trimmedTotalCosts = trimmedResults.map(record => +record.TotalCost);
    const combinedTotalCost = trimmedTotalCosts.reduce((a, b) => a + b, 0);
    const qtys = trimmedResults.map(record => +record.Quantity);
    const numRecords = qtys.reduce((a, b) => a + b, 0);
    const avgCost = (+combinedTotalCost / +numRecords).toFixed(2);

    this.setState({avgCost: avgCost});
  }

  getAvgCost() {
    const filteredResults = this.props.getFilteredResults();
    const costs = filteredResults.map(record => +record.TotalCost);
    const combinedCost = costs.reduce((a, b) => a + b, 0);
    const qtys = filteredResults.map(record => +record.Quantity);
    const numRecords = qtys.reduce((a, b) => a + b, 0);
    const avgCost = (+combinedCost / +numRecords).toFixed(2);

    this.setState({ avgCost: avgCost });
  }

  render() {
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
