class Participant < ApplicationRecord
  belongs_to :status

  validates_uniqueness_of :external_identifier, allow_blank: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :age, presence: true

  after_save :generate_external_identifier, :generate_default_status_id

  def generate_external_identifier
    self.update(external_identifier: "P-#{self.id.to_s.rjust(4, '0')}") if self.external_identifier.nil?
  end

  def generate_default_status_id
    default_status = Status.find_by(status_name: 'Not reviewed')
    self.update(status_id: default_status.id) if self.status_id.nil?
  end
end
