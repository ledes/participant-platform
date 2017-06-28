require 'csv'

Participant.destroy_all
Status.destroy_all

status_names = %w( not_reviewed accepted not_accepted )

status_names.each do |name|
  Status.find_or_create_by( name: name )
end

initial_participants = File.read("#{Rails.root}/db/participants.csv")

CSV.parse(initial_participants, headers: true) do |row|
  Participant.find_or_create_by(
    external_id: row['external_id'],
    first_name: row['first_name'],
    last_name: row['last_name'],
    middle_name: row['middle_name'],
    has_siblings: row['has_siblings'],
    age: row['age'],
    environmental_exposures: row['environmental_exposures'],
    genetic_mutations: row['genetic_mutations'],
    status_id: row['status_id']
  )
end
