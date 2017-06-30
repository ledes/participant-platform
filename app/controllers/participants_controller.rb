class ParticipantsController < ApplicationController

  def index
    @participants = get_participants
  end

  def update_status
    participant = Participant.find_by(external_identifier: params['external_identifier'])
    status = Status.find_by(status_name: params['status'])
    participant.status_id = status.id
    participant.save!
    render json: participant
  end

  private

  def get_participants
    sql = %{
      SELECT *
      FROM participants
      INNER JOIN statuses AS s
        ON s.id = participants.status_id
    }
    result = ActiveRecord::Base.connection.execute(sql)
    result.to_a
  end
end
