var ParticipantForm = React.createClass({


  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      hasSiblings: '',
      environmental_exposures: '',
      genetic_mutations: ''
    }
  },

  canSubmit: function() {
    var state = this.state;
    debugger;
    return !_.isEmpty(state.firstName) && !_.isEmpty(state.lastName) &&
           !_.isEmpty(state.age) && state.hasSiblings !== '';
  },

  onChangeText: function(key ,e) {
    switch(key) {
      case "firstName":
        this.setState({firstName: e.target.value});
        break;
      case "lastName":
        this.setState({lastName: e.target.value});
        break;
      case "age":
        this.setState({age: e.target.value});
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
      this.setState({hasSiblings: true});
    } else {
      this.setState({hasSiblings: ''});
    }
  },

  onCheckHasNoSiblings: function(e) {
    if (e.target.checked) {
      this.setState({hasSiblings: false});
    } else {
      this.setState({hasSiblings: ''});
    }
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
              onChange={this.onChangeText.bind(null, 'firstName')}
            />
          </div>
          <div className="form-sub-group">
            <label>Last name</label>
            <input
              className="form-control input-sm"
              type="text"
              placeholder="Last name"
              value={this.state.lastName}
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
                  checked={!_.isEmpty(this.state.hasSiblings) || this.state.hasSiblings === true}
                  type="checkbox"
                  onChange={this.onCheckHasSiblings} />
              </label>
              <label>No
                <input
                  name="No"
                  type="checkbox"
                  checked={!_.isEmpty(this.state.hasSiblings) || this.state.hasSiblings === false}
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
        <button type="submit" disabled={!this.canSubmit()} className="btn btn-default">Submit</button>
      </div>
    );
  }
});
