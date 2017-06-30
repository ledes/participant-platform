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

    var changeSort = () => {
      if (idx === this.state.sortColumnIndex) {
        var currentSortDescending = this.state.sortDescending;
        this.setState({
          sortDescending: !currentSortDescending
        });
      } else {
        this.setState({sortColumnIndex: idx, sortDescending: false});
      }
    };

    return (
      <th className={className} onClick={changeSort} key={idx}>
        {column.header} <span className="sortable-table-icon glyphicon" />
      </th>
    );
  },

  _renderRow: function(row, rowIdx) {
    return (
      <tr key={this.props.keyFn(row)}>
        {this.props.columns.map((column, columnIdx) =>
          <td key={columnIdx}>
            {column.renderCell(row, rowIdx)}
          </td>
        )}
      </tr>
    );
  },

  // Sort

  _sortedData: function() {
    // TODO write sort function
    return this.props.data;
  },
});
