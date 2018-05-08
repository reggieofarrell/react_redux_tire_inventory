import React, {Component} from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

class Avails extends Component {
  constructor(props){
  	super(props);

    this.columns = [
  {
    dataField: "recid",
    isKey: true,
    hidden: true,
    export: false,
    isKey: true,
    hiddenOnInsert: true
  },
  actionsBtnConfig,
  {
    dataField: "Status",
    validator: "requiredField",
    formElement: 'select',
    hardSelectOptions: [
      'A', 'O', 'S'
    ],
    filter: {
      type: 'TextFilter'
    },
    width: "85px"
  }, {
    dataField: "AvailDate",
    displayName: "Avail Date",
    dataFormatType: 'date',
    formElement: 'date',
    validator: "requiredField",
    filter: {
      type: 'DateFilter'
    },
    width: "250px"
  }, {
    dataField: "SupplierName",
    displayName: "Supplier Name",
    hidden: true,
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    }
  }, {
    dataField: "SupplierID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    validator: "requiredField",
    formFieldDisplayName: "Supplier Name",
    formElement: 'select',
    selectLabel: "SupplierName",
    endpoint: "Suppliers"
  },
  {
    dataField: "BrandName",
    displayName: "Brand",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "120px"
  }, {
    dataField: "BrandID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "Brand",
    formElement: 'select',
    selectLabel: "BrandName",
    endpoint: "TireBrands",
    validator: "requiredField"
  }, {
    dataField: "Quality",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "120px"
  },
  {
    dataField: "ModelName",
    displayName: "Model",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "120px"
  }, {
    dataField: "ModelID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "Model",
    formElement: 'select',
    selectLabel: "ModelName",
    endpoint: "TireModels"
  }, {
    dataField: "TirePattern",
    displayName: "Pat",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "85px"
  }, {
    dataField: "PatternID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "Pattern",
    formElement: 'select',
    selectLabel: "TirePattern",
    endpoint: "TirePatterns"
  }, {
    dataField: "TireSize",
    displayName: "Size",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "100px"
  }, {
    dataField: "SizeID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "Size",
    formElement: 'select',
    selectLabel: "TireSize",
    endpoint: "TireSizes",
    validator: "requiredField"
  }, {
    dataField: "CondCode",
    displayName: "Cond",
    formFieldDisplayName: "Condition Code",
    formElement: 'select',
    hardSelectOptions: [
      'New',
      'Retread',
      'Used',
      'Remold',
      'Casings',
      'Blems',
      'FacBlems',
      'TakeOffs'
    ],
    filter: {
      type: 'TextFilter'
    },
    width: "100px"
  }, {
    dataField: "PlyRating",
    displayName: "P Rat",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "80px"
  }, {
    dataField: "PlyRatingID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "Ply Rating",
    formElement: 'select',
    selectLabel: "PlyRating",
    endpoint: "PlyRatings"
  }, {
    dataField: "RubberCompound",
    displayName: "R Comp",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "80px"
  }, {
    dataField: "RubberCompoundID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "Rubber Compound",
    formElement: 'select',
    selectLabel: "Compound",
    endpoint: "RubberCompounds"
  }, {
    dataField: "BiasOrRadial",
    displayName: "Bi/Ra",
    formFieldDisplayName: "Bias Or Radial",
    formElement: 'select',
    hardSelectOptions: [
      'Bias', 'Radial'
    ],
    filter: {
      type: 'TextFilter'
    },
    width: "80px"
  }, {
    dataField: "TRACode",
    displayName: "TRA",
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    },
    width: "80px"
  }, {
    dataField: "TRACodeID",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formFieldDisplayName: "TRA Code",
    formElement: 'select',
    selectLabel: "TRACode",
    endpoint: "TraCodes"
  }, {
    dataField: "Cost",
    displayName: "Unit Cost",
    filter: {
      type: 'NumberFilter'
    },
    width: "185px",
    sortType: 'numeric',
    dataFormatType: 'number',
    formIcon: 'fa fa-dollar',
    validator: 'requiredField'
  }, {
    dataField: "Quantity",
    displayName: "Qty",
    filter: {
      type: 'NumberFilter'
    },
    dataFormatType: 'number',
    filterFormatted: true,
    sortType: 'numeric',
    width: "130px",
    validator: "greaterThanZero"
  }, {
    dataField: "TotalCost",
    displayName: "Total Cost",
    hiddenOnInsert: true,
    hiddenOnEdit: true,
    filter: {
      type: 'NumberFilter'
    },
    width: "185px",
    sortType: 'numeric',
    dataFormatType: 'number'
  }, {
    dataField: "YearOfManufacture",
    displayName: "Year",
    filter: {
      type: 'NumberFilter'
    },
    width: "185px",
    sortType: 'numeric',
    dataFormatType: 'number',
    validator: 'fourDidgetYear'
  }, {
    dataField: "Currency",
    displayName: "Cur",
    formFieldDisplayName: "Currency",
    formIcon: "dollar",
    formElement: 'select',
    hardSelectOptions: [
      'USD', 'CAD', 'UAD', 'EURO'
    ],
    filter: {
      type: 'TextFilter'
    },
    width: "80px"
  }, {
    dataField: "FOBLocation",
    displayName: "Loc",
    formFieldDisplayName: "FOB Location",
    filter: {
      type: 'TextFilter'
    },
    width: "100px"
  },
  {
    dataField: "PackageName",
    displayName: "Pkg Name",
    formFieldDisplayName: "Package Name",
    filter: {
      type: 'TextFilter'
    }
  }, {
    dataField: "Comments",
    hidden: true,
    formElement: "textarea",
    validator: "charLimit",
    charLimit: 250
  }, {
    dataField: "HasNumbers",
    displayName: "Has #'s",
    formFieldDisplayName: "Has Serial Numbers",
    inputType: "checkbox",
    formElement: 'checkbox',
    filter: {
      type: 'TextFilter'
    },
    width: "80px"
  }, {
    dataField: "SupplierName",
    hiddenOnEdit: true,
    hiddenOnInsert: true,
    displayName: "Supplier",
    filter: {
      type: 'TextFilter'
    }
  }, {
    dataField: "ContactName",
    displayName: "Contact",
    hiddenOnEdit: true,
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    }
  }, {
    dataField: "Phone1",
    displayName: "Phone",
    hiddenOnEdit: true,
    hiddenOnInsert: true,
    filter: {
      type: 'TextFilter'
    }
  }
];
  }

  render() {
    return (
      <div className="">
        <InventoryBootstrapTable
          endpoint="Avails"
          columns={this.columns}
          selectOptions={this.selectOptions}
          hasFilters={true}
          hasLoadAll={true}
          hasAvgCost={true}
        />
      </div>
    );
  }
}

export default Avails;
