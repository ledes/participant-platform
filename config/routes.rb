Rails.application.routes.draw do
  root 'participants#index'

  put '/api/v1/participants/:external_identifier/status'  => 'participants#update_status'
end
