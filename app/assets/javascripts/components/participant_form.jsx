var ParticipantForm = React.createClass({

  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      age: NaN,
      hasSiblings: '',
      environmental_exposures: '',
      genetic_mutations: ''
    }
  },

  canSubmit: function() {
    return _.some(this.state, function(key) { return key === ''});
  },

  render: function() {
    return(
      <div id="participant-form">
        <div className="form-group">
          <div className="form-sub-group">
            <label>First name</label>
            <input
              className="form-control input-sm"
              type="text"
              placeholder="First name"
              value={this.state.firstName}
              onKeyPress={undefined}
              onChange={undefined} />
          </div>
          <div className="form-sub-group">
            <label>Last name</label>
            <input
              className="form-control input-sm"
              type="text"
              placeholder="Last name"
              value={this.state.lastName}
              onKeyPress={undefined}
              onChange={undefined} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-sub-group siblings-group">
            <label>Siblings</label>
            <div className="checkbox-group">
              <label>Yes
                <input
                  name="Yes"
                  checked={_.isEmpty(this.state.hasSiblings) && this.state.hasSiblings}
                  type="checkbox"
                  onChange={undefined} />
              </label>
              <label>No
                <input
                  name="No"
                  type="checkbox"
                  checked={!_.isEmpty(this.state.hasSiblings) && !this.state.hasSiblings}
                  onChange={undefined} />
              </label>
            </div>
            </div>
            <div className="form-sub-group age-group">
              <label>Age</label>
              <input
                className="form-control input-sm"
                type="number"
                placeholder="Age"
                value={this.state.age}
                onKeyPress={undefined}
                onChange={undefined} />
            </div>
        </div>
        <div className="form-group">
          <div className="form-sub-group textarea">
            <label>Known environmental exposures</label>
              <textarea
                className="form-control input-sm"
                type="text"
                placeholder="Known environmental exposures"
                value={this.state.environmental_exposures}
                onKeyPress={undefined}
                onChange={undefined} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-sub-group textarea">
            <label>Known genetic mutations</label>
              <textarea
                className="form-control input-sm"
                placeholder="Known genetic mutations"
                value={this.state.genetic_mutations}
                onKeyPress={undefined}
                onChange={undefined} />
          </div>
        </div>
        <button type="submit" disabled={this.canSubmit()} className="btn btn-default">Submit</button>
      </div>
    );
  }
});
