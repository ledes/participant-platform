class CreateParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :participants do |t|
      t.string :external_identifier
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :middle_name
      t.boolean :has_siblings
      t.integer :age, null: false
      t.string :environmental_exposures
      t.string :genetic_mutations
      t.integer :status_id, null: false

      t.timestamps null: false
    end
  end
end
