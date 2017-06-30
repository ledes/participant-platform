var ParticipantPlatform = React.createClass({

  propTypes: {
    participants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  getInitialState: function() {
    return {
      isParticipantsTabActivated: true
    }
  },

  onAction: function(payload) {
    switch(payload.action){
      case "TAB_CHANGED":
        this.setState({isParticipantsTabActivated: !this.state.isParticipantsTabActivated})
        break;
      default:
        console.log("Caution! Action: '" + payload.action + "' was not handled.");
    }
  },

  render: function() {
    var participants = this.props.participants;
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
                dropdownOptions: [
                  {action: 'CHANGE_TO_APPROVED', value: 'Accepted'},
                  {action: 'CHANGE_TO_NOT_APPROVED', value: 'Not accepted'},
                  {action: 'CHANGE_TO_NOT_REVIEWED', value: 'Not reviewed'}
                ],
                dropdownColumn: 'status_name',
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
