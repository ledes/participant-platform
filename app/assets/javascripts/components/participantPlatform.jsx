var ParticipantPlatform = React.createClass({

  propTypes: {
    participants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render: function() {
    var isTabActivated = true;

    return (
      //Head Component
      <div id='participant-platform'>
        <div id='sub-header'>
            <div id='nav-tabs-container'>
              <ul className="nav nav-pills">
                <li role="presentation" className={isTabActivated ? '' : 'active'}>
                  <a href="#" className='tab-link'>Participants</a>
                </li>
                <li role="presentation" className={isTabActivated ? '' : 'active'}>
                  <a href="#" className='tab-link'>Add Participant</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        // Table component
       //  Form Component
    );
  }
});
