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

    return (
      <div id='participant-platform'>
        <TopBar
          onAction={this.onAction}
          isParticipantsTabActivated={this.state.isParticipantsTabActivated}/>
      </div>

        // Table component
       //  Form Component
    );
  }
});
