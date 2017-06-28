require 'rails_helper'

RSpec.describe Status, type: :model do
  it { should have_many(:participants) }
  it { should validate_presence_of :status_name }
end
