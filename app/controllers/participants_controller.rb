class ParticipantsController < ApplicationController

  def index
    @participants = Participant.all
    @statuses = Status.all
  end

  def update_status
    participant = Participant.find_by(external_identifier: params['external_identifier'])
    status = Status.find_by(status_name: params['status'])
    participant.status_id = status.id
    participant.save!
    render json: participant
  end

end
