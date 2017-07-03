# README

### Description
Heroku app: https://quiet-beach-93641.herokuapp.com/


In order to build this app I decided to have a backend for saving the new records.
The backend is built on Ruby on Rails and a PostgreSQL database. For the front end I decided to use
ReactJS(react-rails). For building the Javascript code I'm using ES5, the reason for this is that the implementation
and deployment with ES6 in react-rails takes more time and I'm comfortable written ES5 and ES6.
If you are interested in seeing ES6 code, I have other repos using it, please let me know


### Technical Specifications
* Ruby on Rails
* Ruby (2.3.0)
* PostgreSQL
* ReactJs(react-rails)
* SASS
* Rspec


### Features
* When the page loads, the user is in the `Participants` tab
* The status of a participant can be changed without reloading the page. If it is approved the row color changes to be green. If it is not approved the row color changes to be red
* Clicking on the `Add participant` tab a form is displayed. `first_name`, `last_name`, `has_siblings` and `age` are required fields
* After the form is summited the user is redirected to the `Participants` tab with the new record and no reloading of the page
* Sortable columns in `DESC` or `ASC` order. I decided that
  every column should be sortable except environmental_exposures and genetic_mutations
* Api calls for new records and for updating a participant' status make possible to update the info without reloading the page


### Back end
There are 2 tables: `Participants` and `Statuses`.

* Each `status` can have many `participants`

* Each `participant` belongs to a `status`

I have created a csv file called `participants.csv` to have records when the app is deployed or used in development for the first time.
The seed file will read the csv file and save the statuses and participants in the database.

[Imgur](http://i.imgur.com/0DCX70M.jpg)

The `update_status` action and `new participant` action backend are connected to the front end through apis.
This can be found in the `routes` file and the `participants_controller` file.
I have a created and used an `external_identifier` instead of the id provided for the database because in a real life implementation is more reliable. A record will always have the same external id no matter what problems could happen in the database that may require to remove or add records.


### Front end
The front end is built using ReactJs.
The initial data when the page loads is feed from the controller and the data due to updates or new creations is taken or saved through an api.
In order to connect to the rails controller I have use AJAX.

There are 4 components that build the UI. The main component is `participant-platform` where holds the state, the ajax calls are done and where all the rest of components live.
One of those component is a reusable sortable table (`sortableTable`) that I made for this purpose and to be reused in other apps or in for other future features for this app.


### Use in development
In order to use this app in development:
 * Make sure to use `ruby 2.3.0` and have PostgreSQL running
 * Download the repo and access the folder within the rails app in Terminal
 * Run `bundle install`
 * Run `rake db:create && rake db:migrate && rake db:seed`
 * Run `rails s` to start the server

### Test
This app has test for the models using Rspec. In order to run them type in
terminal while you are in the project folder `rspec spec`


### What are some measures we could take to secure this application?
Since we are dealing with medical records and privacy is important, I would make sure that the backend only feeds the front end with the necessary information. Any sensitive data should never be sent to the UI for an unauthorized client.

Also I would make sure to have a log-in system where users have different roles. We would use this roles to know what information should be sent to the ui and what not.

Same level of security I would implement for the APIs, where only users with the right token can access or change info from the database.

Not sure if it is necessary to use the names in the UI, but by displaying only the `external_identifier` and no the names, the platform could be secure. If for some reason a name has to be found it could be query in the database with the right access and the external_identifier

Also, I would implement a more robust form validation in the ui and the backend. For example, right now a user can open the chrome dev tools while in the form, remove the disabled tag from the submit button and be able to submit a record without the required fields. In order to secure this, we should make sure that the api fails if the user hasn't submitted the right parameters in the right format and provide useful errors that can be displayed in the UI.

### What are some ways in which the above mentioned workflow could be made more dynamic from a UI/UX perspective?

For a more complex application I would personally have a backend separated from the front end. This provides with multiple advantages other than freedom to use React, since we wouldn't be limited by the gem react-rails(gem that allows you to work with react in a rails application).
The backend will have multiple APIs that the ReactJs front end app would use. Also if one day we decide that React is no longer what we want to use for the front end or that for example we want to build a mobile app we can still use the backend and the APIS.

Regarding to the UI I would implement [react router](https://github.com/ReactTraining/react-router). This will allow the user to reload the page while is in the form tab and the new page will load in the form tab. React router will changes the urls but the app will still be able to move from the different views without reloading(`one single page app`). Also there would be pages that users with a specific role won't be able to visit and redirected to a secure view.

Another important implementation would be Redux to handle the state of the application where we would use to have a more simple code and a UI with more possibilities. Redux makes it possible to track every single state change in an application. This has some important implications, including the ability to easily undo and redo data changes and to track actions so that errors can be logged.
