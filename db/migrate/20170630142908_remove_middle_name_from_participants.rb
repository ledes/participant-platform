class RemoveMiddleNameFromParticipants < ActiveRecord::Migration[5.0]
  def change
    remove_column :participants, :middle_name, :string
  end
end
