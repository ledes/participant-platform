class CreateParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :participants do |t|
      t.integer :external_id, uniqueness: true
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :middle_name
      t.boolean :has_siblings, null: false
      t.integer :age, null: false
      t.string :environmental_exposures
      t.string :genetic_mutations
      t.string :status_id, null: false, default: 1

      t.timestamps null: false
    end
  end
end
