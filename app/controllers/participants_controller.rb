class ParticipantsController < ApplicationController

  def index
    @participants = Participant.all
    @statuses = Status.all
  end

  def new
    participant = Participant.new(participant_params)
    defaultStatus = Status.find_by(status_name: 'Not reviewed')
    binding.pry
    participant.status_id = defaultStatus.id
    participant.save!
    render json: participant
  end

  def update_status
    participant = Participant.find_by(external_identifier: params['external_identifier'])
    status = Status.find_by(status_name: params['status'])
    participant.status_id = status.id
    participant.save!
    render json: participant
  end


  private

  def participant_params
    params.require(:participant).permit(
      :first_name,
      :last_name,
      :age,
      :has_siblings,
      :environmental_exposures,
      :genetic_mutations
    )
  end

end
