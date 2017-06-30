var ParticipantPlatform = React.createClass({

  propTypes: {
    participants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    statuses: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },

  getInitialState: function() {
    return {
      participants: this.props.participants,
      isParticipantsTabActivated: true
    }
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

  formatDropdownOptions: function() {
    var statuses = this.props.statuses;
    return _.map(statuses, function(status) {
      return {id: status.id, name: status.status_name};
    })
  },

  render: function() {
    var participants = this.state.participants;
    var statuses = this.formatDropdownOptions();
    // TODO extract blob of columns
    return (
      <div id='participant-platform'>
        <TopBar
          onAction={this.onAction}
          isParticipantsTabActivated={this.state.isParticipantsTabActivated}/>

          <SortableTable
            data={participants}
            keyFn={function(participant) {return participant.external_identifier}}
            onAction={this.onAction}
            validationColum={'status_id'}
            columns={[
              {
                header: "Identifier",
                renderCell: function(participant) {return participant.external_identifier},
                sortBy: function(participant) {return participant.external_identifier},
                initialSort: "desc",
              },
              {
                header: "Name",
                renderCell: function(participant) {return participant.last_name + ", " + participant.first_name},
                sortBy: function(participant) {return participant.last_name},
              },
              {
                header: "Age",
                renderCell: function(participant) {return participant.age},
                sortBy: function(participant) {return participant.age},
              },
              {
                header: "siblings",
                renderCell: function(participant) {return participant.has_siblings ? "Yes" : "No"},
                sortBy: function(participant) {return participant.has_siblings}
              },
              {
                header: "Known environmental exposures",
                renderCell: function(participant) {return participant.environmental_exposures}
              },
              {
                header: "Known genetic mutations",
                renderCell: function(participant) {return participant.genetic_mutations}
              },
              {
                header: "Status name",
                dropdown: { options: statuses, //{id, name}
                            dropdownColumnOptionIdKey: 'status_id',
                            action: 'CHANGE_STATUS'},
                renderCell: function(participant) {return participant.status_name},
                sortBy: function(participant) {return participant.status_name},
              },
            ]}
          />
      </div>

        // Table component
       //  Form Component
    );
  }
});
