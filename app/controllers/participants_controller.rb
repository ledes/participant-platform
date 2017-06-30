class ParticipantsController < ApplicationController

  def index
    @participants = get_participants
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

    ## TODO get full name
  end
end
