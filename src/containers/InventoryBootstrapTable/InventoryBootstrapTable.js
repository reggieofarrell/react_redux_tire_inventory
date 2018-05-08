import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Row, Col, Button } from 'reactstrap';
import { client } from '../../actions/client.js';
import json2csv from 'json2csv';
import _ from 'lodash';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { fetchCollection, deleteRecord, loadAllAvails } from '../../actions/crud_actions';
import { createAlert } from '../../actions';

import BsTableActionsDropdown from '../../components/BsTableActionsDropdown';
import { NewRecordModal, AvgCostModal } from '../../components/Modals';
import CustomCheckbox from '../../components/CustomCheckbox';

class InventoryBootstrapTable extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      tableData: [],
      modal: false,
      modalType: '',
      editRecordValues: {},
      selectOptions: {},
      avgCostModal: false,
      filteredResults: [],
      avgCost: 0
    };

    this.renderActionsButton = this.renderActionsButton.bind(this);
    this.renderDefaultData = this.renderDefaultData.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
    this.createCustomButtonGroup = this.createCustomButtonGroup.bind(this);
    this.toggleNewRecord = this.toggleNewRecord.bind(this);
    this.toggleEditRecord = this.toggleEditRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.setCurrentEditRecord = this.setCurrentEditRecord.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.fetchUnfiltered = this.fetchUnfiltered.bind(this);
    this.fetchDefault = this.fetchDefault.bind(this);
    this.getFilteredResults = this.getFilteredResults.bind(this);
    this.toggleAvgCost = this.toggleAvgCost.bind(this);
    this.getAvgCost = this.getAvgCost.bind(this);
  }

  toggleNewRecord() {
    this.setState({ modalType: 'New' });
    this.setState({ modal: !this.state.modal });
  }

  toggleEditRecord() {
    this.setState({ modalType: 'Edit' });
    this.setState({ modal: !this.state.modal });
  }

  toggleAvgCost() {
    if (!this.state.avgCostModal) {
      this.setState({
        filteredResults: this.getFilteredResults(),
        avgCost: this.getAvgCost()
      }, this.setState({ avgCostModal: !this.state.avgCostModal }) );
    } else {
      this.setState({ avgCostModal: !this.state.avgCostModal });
    }
  }

  setCurrentEditRecord(row) {
    this.setState({ editRecordValues: row });
  }

  getAvgCost() {
    const filteredResults = this.getFilteredResults();
    const costs = filteredResults.map(record => +record.TotalCost);
    const combinedCost = costs.reduce((a, b) => a + b, 0);
    const qtys = filteredResults.map(record => +record.Quantity);
    const numRecords = qtys.reduce((a, b) => a + b, 0);
    const avgCost = (+combinedCost / +numRecords).toFixed(2);

    return avgCost;
  }

  renderActionsButton(cell, row){
    return (
      <BsTableActionsDropdown
        record={row}
        setRecord={this.setCurrentEditRecord}
        toggleEdit={this.toggleEditRecord}
        deleteRecord={this.deleteRecord}
        endpoint={this.props.endpoint}
      />
    );
  }

  renderDefaultData(cell){
    return cell;
  }

  trimDateTime(date) {
    return date.substring(0, 10);
  }

  getFilteredResults() {
    return this.refs.table.getTableDataIgnorePaging();
  }

  componentWillMount() {
    if (this.props.loadAllAvailsVal === true && this.props.hasLoadAll) {
      this.fetchUnfiltered();
    } else {
      this.props.fetchCollection(this.props.endpoint);
    }

    // get from select options from API
    const selects = _.filter(this.props.columns, ['formElement', 'select']);
    let selectState = {};
    let processedSelects = 0;

    selects.forEach(select => {
      if (!select.hardSelectOptions) {
        client.get(`${select.endpoint}`).then(response => {
          const options = response.data.map(data => {
            return {
              label: data[select.selectLabel],
              value: data.recid
            };
          });
          selectState[select.dataField] = options;
          processedSelects++;
          if (processedSelects === selects.length) {
            this.setState({
              selectOptions: {...this.state.selectOptions, ...selectState}
            });
          }
        });
      } else {
        const options = select.hardSelectOptions.map(option => {
          return { value: option, label: option };
        });
        selectState[select.dataField] = options;
        processedSelects++;
        if (processedSelects === selects.length) {
          this.setState({
            selectOptions: {...this.state.selectOptions, ...selectState}
          });
        }
      }
    });
  }

  handleClearFilters() {
    this.refs.table.reset();
  }

  numberFormat(cell) {
    if (cell === null || cell === undefined) return null;
    return parseInt(cell);
  }

  dateFormat(cell, row) {
    const d = new Date(cell);
    return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
  }

  numericSort(a, b, order, sortField) {
    if (order === 'desc') {
      return +(b[sortField]) - +(a[sortField]);
    } else {
      return +(a[sortField]) - +(b[sortField]);
    }
  }

  renderColumns() {
    const columns = this.props.columns;
    return _.map( (columns, column, idx) => {

      const getFormatFunction = (cell, row) => {
        switch (column.dataFormatType) {
          case 'actionsButton':
            return this.renderActionsButton(cell, row);
            break;
          case 'date':
            return this.trimDateTime(cell);
            break;
          case 'number':
            return this.numberFormat(cell);
            break;
          default:
            return this.renderDefaultData(cell);
        }
      }

      const getSortFunction = (a, b, order, sortField) => {
        if (column.sortType === 'numeric') {
          return this.numericSort(a, b, order, sortField);
        }
      }

      return (
        <TableHeaderColumn
          key={idx}
          ref={column.dataField}
          dataField={ column.dataField }
          isKey={ column.isKey !== undefined ? column.isKey : false }
          dataSort={ column.dataSort !== undefined ? column.dataSort : true }
          hidden={ column.hidden !== undefined ? column.hidden : false }
          export={ column.export !== undefined ? column.export : true }
          searchable={ column.searchable !== undefined ? column.searchable : true }
          width={ column.width !== undefined ? column.width : '200px' }
          dataFormat={ column.dataFormatType !== undefined ? getFormatFunction : this.getDefaultData }
          columnClassName={ column.dataFormatType === 'actionsButton' ? 'bs-table-dropdown' : '' }
          filter={column.filter}
          filterFormatted
          sortFunc={ column.sortType !== undefined ? getSortFunction : null}
          hiddenOnInsert={ column.hiddenOnInsert !== undefined ? column.hiddenOnInsert : false }>
          {column.displayName || column.dataField}
        </TableHeaderColumn>
      );
    });
  }

  fetchUnfiltered() {
    if (this.props.loadAllAvailsVal == false) {
      this.props.loadAllAvails(true);
    }
    this.props.fetchCollection(this.props.endpoint, {
      all: true
    });
  }

  fetchDefault() {
    this.props.loadAllAvails(false);
    this.props.fetchCollection(this.props.endpoint);
  }

  createCustomButtonGroup(props) {
    const addNewButton = () => (
      <button onClick={this.toggleNewRecord} type='button'
        className={ `btn btn-primary` }>
        <i className="fa fa-plus" /> New
      </button>
    );

    const avgCostButton = () => (
      <button
        onClick={this.toggleAvgCost}
        type='button'
        className={ `btn btn-info` }
      >
        <i className="fa fa-dollar" /> Avg
      </button>
    );

    const loadAllCbx = () => (
      <div className="d-inline">
        <CustomCheckbox
          label="Load All"
          background="#fff"
          checkedCallback={this.fetchUnfiltered}
          uncheckedCallback={this.fetchDefault}
          checked={this.props.loadAllAvailsVal === true ? true : false }
          disabled={this.props.showSpinner}
        />
        {this.props.showSpinner &&
          <i className="fa fa-spinner fa-pulse fa-fw align-middle" style={{marginLeft: '-.7rem'}} />
        }
      </div>
    );

    return (
      <div>
        <ButtonGroup className='table-button-group' sizeClass='btn-group-sm'>
          { props.exportCSVBtn }
          { props.deleteBtn }
          {this.props.addNewRecords !== false ? addNewButton() : ''}
          <button onClick={this.handleClearFilters} type='button'
            className={ `btn btn-warning` }>
            <i className="fa fa-ban"></i> Clear Filters
          </button>
          {(!!this.props.hasAvgCost && this.props.hasAvgCost) && avgCostButton()}
        </ButtonGroup>
        {this.props.hasLoadAll && loadAllCbx()}
      </div>
    );
  }

  refreshTable() {
    client.get(`${this.props.endpoint}`).then(response => {
      this.setState({ tableData: response.data });
    });
  }

  deleteRecord(recid) {
    if (confirm('Are you sure?')) {
      this.props.deleteRecord(this.props.endpoint, recid, () => {
        this.props.fetchCollection(this.props.endpoint);
        this.props.createAlert({
          type: 'success',
          headline: 'Success'
        });
      });
    }
  }

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
      noDataText: this.props.loadingCollection ? 'Loading...' : 'No Data',
      clearSearch: true,
      paginationShowsTotal: true,
      hideSizePerPage: true,
    };

    return (
      <div className="">
        <BootstrapTable
          data={this.props.records}
          tableStyle={{ background: '#fff' }}
          striped
          hover
          version="4"
          pagination
          exportCSV
          search
          options={options}
          ref="table"
        >
          {this.renderColumns()}
        </BootstrapTable>
        <NewRecordModal
          isOpen={this.state.modal}
          toggle={this.toggleNewRecord}
          columns={this.props.columns}
          selectOptions={this.state.selectOptions}
          addRow={this.addRow}
          editRow
          endpoint={this.props.endpoint}
          defaultValues={this.state.editRecordValues}
          refreshTable={this.refreshTable}
          type={this.state.modalType}
        />
        <AvgCostModal
          isOpen={this.state.avgCostModal}
          toggle={this.toggleAvgCost}
          getFilteredResults={this.getFilteredResults}
          filteredResulsts={this.state.filteredResults}
          avgCost={+this.state.avgCost}
        />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    records: state.crudStore.collections[ownProps.endpoint],
    loadingCollection: state.crudStore.loadingCollection,
    showSpinner: state.crudStore.showSpinner,
    loadAllAvailsVal: state.crudStore.loadAllAvails
  };
}

export default connect(mapStateToProps, {
  fetchCollection,
  deleteRecord,
  createAlert,
  loadAllAvails
})(InventoryBootstrapTable);
