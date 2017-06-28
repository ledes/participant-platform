require 'csv'

Participant.destroy_all
Status.destroy_all

status_names = %w( not_reviewed accepted not_accepted )

status_names.each do |name|
  Status.find_or_create_by( status_name: name )
end

initial_participants = File.read("#{Rails.root}/db/participants.csv")
CSV.parse(initial_participants, headers: true) do |row|
  status_id = Status.find_by(status_name: row['status_name']).id
  Participant.create!(
    external_identifier: row['external_identifier'],
    first_name: row['first_name'],
    last_name: row['last_name'],
    middle_name: row['middle_name'],
    has_siblings: row['has_siblings'] == 'true' ? true : false,
    age: row['age'].to_i,
    environmental_exposures: row['environmental_exposures'],
    genetic_mutations: row['genetic_mutations'],
    status_id: status_id
  )
end
