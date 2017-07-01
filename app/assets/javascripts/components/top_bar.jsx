var TopBar = React.createClass({

  propTypes: {
    isParticipantsTabActivated: React.PropTypes.bool.isRequired,
    onAction: React.PropTypes.func.isRequired
  },

  switchTab(isSwitching) {
    if (isSwitching) {
      var payload = { action: "TAB_CHANGED" };
      this.props.onAction(payload);
    }
  },

  render: function() {
    var isParticipantsTabActivated = this.props.isParticipantsTabActivated;

    return (
      <div id='top-bar'>
        <div id='nav-tabs-container'>
          <ul className="nav nav-pills">
            <li role="presentation"
                onClick={this.switchTab.bind(null, !isParticipantsTabActivated)}
                className={isParticipantsTabActivated ? 'active' : ''}>
              <a className='tab-link'>
                <i className="fa fa-list" aria-hidden="true"></i>Participants
              </a>
            </li>
            <li role="presentation"
                onClick={this.switchTab.bind(null, isParticipantsTabActivated)}
                className={isParticipantsTabActivated ? '' : 'active'}>
              <a className='tab-link'>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>Add Participant
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
