require "rails_helper"

RSpec.describe Participant, type: :model do
  describe "validations" do
    subject { Participant.new(
      first_name: "Pablo",
      last_name: "Perena",
      has_siblings: true,
      age: 20
    ) }
    it { should belong_to(:status) }
    it { should validate_presence_of :external_id }
    it { should validate_presence_of :first_name }
    it { should validate_presence_of :last_name }
    it { should validate_presence_of :has_siblings }
    it { should validate_presence_of :age }
  end
end
