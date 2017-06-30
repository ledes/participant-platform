"use strict";

var SortableTable = React.createClass({

  // Props

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    keyFn: React.PropTypes.func.isRequired,
    columns: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        header: React.PropTypes.node.isRequired,
        renderCell: React.PropTypes.func.isRequired,
        sortBy: React.PropTypes.func,
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

  // Render

  render: function() {
    return (
      <table className="table sortable-table">
        <colgroup>{this.props.columns.map(this._renderCol)}</colgroup>
        <thead><tr>{this.props.columns.map(this._renderHeaderCell)}</tr></thead>
        <tbody>{this._sortedData().map(this._renderRow)}</tbody>
      </table>
    );
  },

  _renderCol: function(column, idx) {
    return (<col key={idx} />);
  },

  _renderHeaderCell: function(column, idx) {
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

  changeSort: function(idx) {
    if (idx === this.state.sortColumnIndex) {
      var currentSortDescending = this.state.sortDescending;
      this.setState({
        sortDescending: !currentSortDescending
      });
    } else {
      this.setState({sortColumnIndex: idx, sortDescending: false});
    }
  },

  changeOption: function(action, e){
    var that = this;
    var payload = {
      action: action,
      value: e.target.value
    };
    this.props.onAction(payload);
  },

  renderDropDown: function(row, column, columnIdx, rowStyle) {
    var that = this;
    var options = _.map(column.dropdown.options, function(op, opIdx) {
      return ( <option key={opIdx}>{op}</option> );
    })
    return (
      <td className={rowStyle} key={columnIdx}>
        <select className="selectpicker"
                defaultValue={row[column.dropdown.dropdownColumn]}
                onChange={that.changeOption.bind(null, column.dropdown.action)}>
          {options}
        </select>
      </td>
    );
  },

  _renderRow: function(row, rowIdx) {
    var that = this;
    var rowStyle;
    if (row.status_name === 'Accepted') {
      rowStyle = 'passed-validation';
    } else if (row.status_name === 'Not accepted') {
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
