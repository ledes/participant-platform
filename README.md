# README

### Description
Heroku app: https://quiet-beach-93641.herokuapp.com/

Before building the app, I decided to have a backend for saving the new records and update the one already in existence. The backend is built on a Ruby on Rails app and a PostgreSQL database. For the front end, I decided to use ReactJS(react-rails). For writing Javascript, I'm using ES5, the reason for this is that the implementation and deployment with ES6 in react-rails takes more time. However,  if you are interested in seeing my ES6 code, I have other repos using it and can send them to you.


### Technical Specifications
* Ruby on Rails (>= 5.0.0.1)
* Ruby (2.3.0)
* PostgreSQL
* ReactJs(react-rails)
* SASS
* Rspec


### Features
* When the page loads, the user is in the `Participants` tab
* The status of a participant can be changed without reloading the page. If it is approved, the row color changes to be green. If it is not approved, the row color changes to be red
* Clicking on the `Add participant` tab a form is displayed. `first_name`, `last_name`, `has_siblings` and `age` are required fields
* After the form is submitted, the user is redirected to the `Participants` tab with the new record and no reloading of the page
* Sortable columns in `DESC` or `ASC` order. I decided that
  every column should be sortable except environmental_exposures and genetic_mutations
* The APIs for creating new records and for updating a participant status allow data to be updated without reloading the page


### Back end
There are 2 tables: `Participants` and `Statuses`.

* Each `status` have many `participants`

* Each `participant` belongs to a `status`

I have created a CSV file called `participants.csv` for having initial records when the app is deployed or used in development for the first time. The seed file will read the CSV file and save the statuses and participants in the database.

![Imgur](http://i.imgur.com/0DCX70M.jpg)

The `update_status` action and `new participant` action backend are connected to the front end through apis.
This can be found in the `routes` file and the `participants_controller` file.
I have a created and used an `external_identifier` instead of the id provided for the database because in a real life implementation is more reliable. A record will always have the same external id no matter what problems could happen in the database that may require to remove or add records.


### Front end
The front end is built using ReactJs. The initial data when the page loads is fed from the controller and the data is updated or saved through API calls. In order to connect to the rails controller I have used AJAX. The main component with the state will execute the AJAX that goes to the Rails controller where we can update or create new records in the database.


There are 4 components in the UI. The main component is `participant-platform` that holds the state, where the AJAX calls are done and where all the rest of components live. One of those component is a reusable sortable table (`sortableTable`) that I made for this purpose and to be reused in other apps or in for other future features for this app.


### Use in development
In order to use this app in development:
 * Make sure to have a rails environment set up. This [link](https://gorails.com/setup/osx/10.12-sierra) explains how to set it up
 * Make sure to use `ruby 2.3.0` and have `PostgreSQL` running. if you don't have this version make sure to install it.
   For installing new ruby versions I personally use `rvm`, but there are [other ways](https://superuser.com/questions/340490/how-to-install-and-use-different-versions-of-ruby). After installing it, make sure you are using it. `rvm use 2.3.0`
 * Download the repo and access the folder within the rails app in Terminal
 * Run `bundle install`
 * Run `rake db:create && rake db:migrate && rake db:seed`
 * Run `rails s` to start the server


### Test
This app has tests for the models using Rspec. In order to run them, type in terminal while you are in the project folder `rspec spec`.


### What are some measures we could take to secure this application?
Since we are dealing with medical records and privacy is important, I would make sure that the backend only feeds the front end with the necessary information. Any sensitive data should never be sent to the UI for an unauthorized client.

Also I would make sure to have a log-in system where users have different roles. We would use these roles to know what information should be sent to the ui and what not.

I would implement the same level of security for the APIs, where only users with the right token can access or change info from the database. An example for this would be that only `Admin` users should be able to change the status of a participant.

Not sure if it is necessary to use the names in the UI, but by displaying only the `external_identifier` and not the names, the platform could be more respectful of privacy. If for some reason a name has to be found, it could be query in the database with the right access and the external_identifier.

Also, I would implement a more robust form validation in the ui and the backend. For example, right now a user can open the chrome dev tools while in the form, remove the disabled tag from the submit button and be able to submit a record without the required fields. In order to secure this, we should make sure that the api fails if the user hasn't submitted the right parameters in the right format and provide useful errors that can be displayed in the UI.


### What are some ways in which the above mentioned workflow could be made more dynamic from a UI/UX perspective?

For a more complex application, I would personally have a backend separated from the front end. This provides multiple advantages other than freedom to use React, since we wouldn't be limited by the gem react-rails(gem that allows you to work with react in a rails application). The backend will have multiple APIs that the ReactJs front end app would use. Also, if one day we decide that React is no longer what we want to use for the front end or that for example we want to build a mobile app we can still use the backend and the APIS.


Regarding to the UI I would personally implement [react router](https://github.com/ReactTraining/react-router). This will allow the user to reload the page while in the form tab and the new page will load in the form tab. React router will changes the urls but the app will still be able to move from the different views without reloading(`one single page app`). AAlso there would be pages that users with a specific role won't be able to visit and redirected to a secure view.

Another important implementation would be Redux to handle the state of the application  and to have a more simple code and a UI with more possibilities. Redux makes it possible to track every single state change in an application. This has some important implications, including the ability to easily undo and redo data changes and to track actions so that errors can be logged.
