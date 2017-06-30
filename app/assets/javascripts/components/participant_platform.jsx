var ParticipantPlatform = React.createClass({

  propTypes: {
    participants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    statuses: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },

  getInitialState: function() {
    return {
      participants: this.props.participants,
      isParticipantsTabActivated: true,
      columns: []
    }
  },

  componentWillMount: function() {
    this.getColumns();
  },

  // Adds Status column, since we need to access the 'statuses' to build the column
  getColumns: function() {
    var statuses = this.formatDropdownOptions();
    var columns = Blobs.StandartTableColumns;
    var statusColumn = {
      header: "Status name",
      dropdown: { options: statuses, //{id, name}
      dropdownColumnOptionIdKey: 'status_id',
      action: 'CHANGE_STATUS'},
      renderCell: function(participant) {return participant.status_name},
      sortBy: function(participant) {return participant.status_id},
    };
    columns.push(statusColumn);
    this.setState({columns: columns});
  },

  onAction: function(payload) {
    switch(payload.action){
      case "TAB_CHANGED":
        this.setState({isParticipantsTabActivated: !this.state.isParticipantsTabActivated});
        break;
      case "CHANGE_STATUS":
        this.changeStatus(payload.rowId, payload.value);
        break;
      default:
        console.log("Caution! Action: '" + payload.action + "' was not handled.");
    }
  },

  updateParticipantInUI: function(participant) {
    var adjustedParticipants = _.clone(this.state.participants);
    var participantIndex = _.findIndex(adjustedParticipants, function(part) {
      return part.external_identifier === participant.external_identifier;
    });
    adjustedParticipants[participantIndex] = participant;
    this.setState({ participants: adjustedParticipants });
  },

  updateWithNewParticipant: function(participant) {
    var adjustedParticipants = _.clone(this.state.participants);
    adjustedParticipants.push(participant);
    this.setState({
      participants: adjustedParticipants,
      isParticipantsTabActivated: true
    });
  },

  changeStatus: function(external_id, value) {
    var params = {status: value};
    var url = 'api/v1/participants/' + external_id + '/status';
    return $.ajax({
      url: url,
      type: 'PUT',
      context: this,
      data: JSON.stringify(params),
      contentType: 'application/json',
      success: function(result) {
        this.updateParticipantInUI(result);
      },
      error: function (error) {
        console.log(error);
      }
    })
  },

  submitParticipant: function(params) {
    var url = 'api/v1/participants/';
    return $.ajax({
      url: url,
      type: 'POST',
      context: this,
      data: JSON.stringify(params),
      contentType: 'application/json',
      success: function(participant) {
        this.updateWithNewParticipant(participant);
      },
      error: function (error) {
        console.log(error);
      }
    })
  },

  formatDropdownOptions: function() {
    var statuses = this.props.statuses;
    return _.map(statuses, function(status) {
      return {id: status.id, name: status.status_name};
    })
  },

  renderSortableTable: function() {
    var participants = this.state.participants;
    if (this.state.isParticipantsTabActivated) {
      return (
        <SortableTable
          data={participants}
          keyFn={function(participant) {return participant.external_identifier}}
          onAction={this.onAction}
          validationColum={'status_id'}
          columns={this.state.columns}/>
      );
    }
  },

  renderParticipantForm: function() {
    if (!this.state.isParticipantsTabActivated) {
      return (
        <ParticipantForm onAction={this.submitParticipant}/>
      );
    }
  },

  render: function() {

    return (
      <div id='participant-platform'>
        <TopBar
          onAction={this.onAction}
          isParticipantsTabActivated={this.state.isParticipantsTabActivated}/>
        <div className='platform-body'>
          {this.renderSortableTable()}
          {this.renderParticipantForm()}
        </div>
      </div>
    );
  }
});
