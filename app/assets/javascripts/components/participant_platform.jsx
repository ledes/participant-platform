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

    return (
      <div id='participant-platform'>
        <TopBar
          onAction={this.onAction}
          isParticipantsTabActivated={this.state.isParticipantsTabActivated}/>


          <SortableTable
            data={participants}
            keyFn={participant => participant.external_identifier}
            columns={[
              {
                header: "Identifier",
                renderCell: participant => participant.external_identifier,
                sortBy: participant => participant.external_identifier,
              },
              {
                header: "Name",
                renderCell: participant => participant.first_name,
                sortBy: participant => participant.first_name,
                initialSort: "desc",
              },
              {
                header: "Age",
                renderCell: participant => participant.age,
                sortBy: participant => participant.age,
              },
              {
                header: "has siblings?",
                renderCell: participant => participant.has_siblings ? "Yes" : "No",
              },
              {
                header: "Status name",
                renderCell: participant => participant.status_name,
                sortBy: participant => participant.status_name,
                initialSort: "desc",
              },
            ]}
          />

      </div>

        // Table component
       //  Form Component
    );
  }
});
