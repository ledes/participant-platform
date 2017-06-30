var ParticipantForm = React.createClass({

  propTypes: {
    onAction: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      first_name: '',
      last_name: '',
      age: '',
      has_siblings: '',
      environmental_exposures: '',
      genetic_mutations: ''
    }
  },

  canSubmit: function() {
    var state = this.state;
    return !_.isEmpty(state.first_name) && !_.isEmpty(state.last_name) &&
           !_.isEmpty(state.age) && state.has_siblings !== '';
  },

  onChangeText: function(key ,e) {
    switch(key) {
      case "firstName":
        this.setState({first_name: e.target.value});
        break;
      case "lastName":
        this.setState({last_name: e.target.value});
        break;
      case "age":
        if (e.target.value >= 0 && e.target.value <= 140 ) {
          this.setState({age: e.target.value});
        }
        break;
      case "environmental_exposures":
        this.setState({environmental_exposures: e.target.value});
        break;
      case "genetic_mutations":
        this.setState({genetic_mutations: e.target.value});
        break;
    }
  },

  onCheckHasSiblings: function(e) {
    if (e.target.checked) {
      this.setState({has_siblings: true});
    } else {
      this.setState({has_siblings: ''});
    }
  },

  onCheckHasNoSiblings: function(e) {
    if (e.target.checked) {
      this.setState({has_siblings: false});
    } else {
      this.setState({has_siblings: ''});
    }
  },

  submitParticipant: function() {
    var params = _.clone(this.state);
    this.props.onAction(params);
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
              value={this.state.first_name}
              onChange={this.onChangeText.bind(null, 'firstName')}
            />
          </div>
          <div className="form-sub-group">
            <label>Last name</label>
            <input
              className="form-control input-sm"
              type="text"
              placeholder="Last name"
              value={this.state.last_name}
              onChange={this.onChangeText.bind(null, 'lastName')} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-sub-group siblings-group">
            <label>Siblings</label>
            <div className="checkbox-group">
              <label>Yes
                <input
                  name="Yes"
                  checked={!_.isEmpty(this.state.has_siblings) || this.state.has_siblings === true}
                  type="checkbox"
                  onChange={this.onCheckHasSiblings} />
              </label>
              <label>No
                <input
                  name="No"
                  type="checkbox"
                  checked={!_.isEmpty(this.state.has_siblings) || this.state.has_siblings === false}
                  onChange={this.onCheckHasNoSiblings} />
              </label>
            </div>
            </div>
            <div className="form-sub-group age-group">
              <label>Age</label>
              <input
                className="form-control input-sm"
                type="number"
                placeholder="Age"
                min={0}
                value={this.state.age}
                onChange={this.onChangeText.bind(null, 'age')} />
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
                onChange={this.onChangeText.bind(null, 'environmental_exposures')} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-sub-group textarea">
            <label>Known genetic mutations</label>
              <textarea
                className="form-control input-sm"
                placeholder="Known genetic mutations"
                value={this.state.genetic_mutations}
                onChange={this.onChangeText.bind(null, 'genetic_mutations')} />
          </div>
        </div>
        <button type="submit"
                disabled={!this.canSubmit()}
                onClick={this.submitParticipant}
                className="btn btn-default">Submit</button>
      </div>
    );
  }
});
