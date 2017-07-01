"use strict";
// Note: I made a completely reusable component to be reused for more features
// in this platform or other projects

var SortableTable = React.createClass({

  // Props

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    keyFn: React.PropTypes.func.isRequired,
    validationColum: React.PropTypes.string.isRequired,
    columns: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        header: React.PropTypes.node.isRequired,
        renderCell: React.PropTypes.func.isRequired,
        sortBy: React.PropTypes.func,
        dropdown: React.PropTypes.shape({
          dropdownColumnOptionIdKey: React.PropTypes.string.isRequired,
          action: React.PropTypes.string.isRequired,
          options: React.PropTypes.arrayOf(React.PropTypes.object),
        }),
        initialSort: React.PropTypes.oneOf(["asc", "desc"])
      })
    ).isRequired,
  },

  // Lifecycle Methods

  getInitialState: function() {
    var idx = _.findIndex(this.props.columns, "initialSort");
    return {
      sortColumnIndex: idx,
      sortDescending: (idx !== -1) && this.props.columns[idx].initialSort === "desc"
    };
  },

  // Actions

  changeSort: function(idx) {
    if (idx === this.state.sortColumnIndex) {
      var currentSortDescending = this.state.sortDescending;
      this.setState({ sortDescending: !currentSortDescending });
    } else {
      this.setState({sortColumnIndex: idx, sortDescending: false});
    }
  },

  onChangeOption: function(payload, e){
    var that = this;
    var params = {
      action: payload.action,
      value: e.target.value,
      rowId: payload.rowId
    };
    this.props.onAction(params);
  },

  // Render

  render: function() {
    return (
      <table className="table sortable-table">
        <colgroup>{this.props.columns.map(this.renderCol)}</colgroup>
        <thead><tr>{this.props.columns.map(this.renderHeaderCell)}</tr></thead>
        <tbody>{this._sortedData().map(this.renderRow)}</tbody>
      </table>
    );
  },

  renderCol: function(column, idx) {
    return (<col key={idx} />);
  },

  renderHeaderCell: function(column, idx) {
    if (!column.sortBy) {
      return (<th key={idx}>{column.header}</th>);
    }
    var className = "sortable";
    if (idx === this.state.sortColumnIndex) {
      className = this.state.sortDescending ? "sorted-desc" : "sorted-asc";
    }

    return (
      <th className={className} onClick={this.changeSort.bind(null, idx)} key={idx}>
        {column.header} <span className="sortable-table-icon glyphicon" />
      </th>
    );
  },

  renderDropDown: function(row, column, columnIdx, rowStyle) {
    var dropdownColumnOptionIdKey = column.dropdown.dropdownColumnOptionIdKey;
    var options = column.dropdown.options;
    var that = this;
    var uiOptions = _.map(options, function(op) {
      return ( <option key={op.id}>{op.name}</option> );
    })
    // Check the blobs file and `getColumns` in the ParticipantPlatform component
    // to see the format of this type of column. Only the columns with dropdowns will have this attributes
    var selectedOption = _.find(options, function(op) { return op.id === row[dropdownColumnOptionIdKey]});
    return (
      <td className={rowStyle} key={columnIdx}>
        <select className="selectpicker"
                defaultValue={selectedOption.name}
                onChange={that.onChangeOption.bind(null, {action: column.dropdown.action, rowId: this.props.keyFn(row)})}>
          {uiOptions}
        </select>
      </td>
    );
  },

  renderRow: function(row, rowIdx) {
    // the value of the column in the row with the same name of the validationColum
    // will change the color of the entire row
    var validationColum = this.props.validationColum;
    var that = this;
    var rowStyle;
    if (row[validationColum] === 1) {
      rowStyle = 'passed-validation';
    } else if (row[validationColum] === 2) {
      rowStyle = 'failed-validation';
    }

    return (
      <tr key={this.props.keyFn(row)}>
        {_.map(this.props.columns, function(column, columnIdx) {
          if (column.dropdown) {
            return that.renderDropDown(row, column, columnIdx, rowStyle);
          } else {
            return (
              <td className={rowStyle} key={columnIdx}>
                {column.renderCell(row, rowIdx)}
              </td>
            );
          }
        })}
      </tr>
    );
  },

  // Sort

  _sortedData: function() {
    var column = this.props.columns[this.state.sortColumnIndex];
    var sort = function(a, b) { return a < b ? -1 : a > b ? 1 : 0 };
    if (this.state.sortDescending) {
      return _.sortBy(this.props.data, [column.sortBy, sort]);
    } else {
      return _.sortBy(this.props.data, [column.sortBy, sort]).reverse();;
    }
  },
});
