class Participant < ApplicationRecord
  belongs_to :status

  validates :external_id, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :has_siblings, presence: true
  validates :age, presence: true
  validates :status_id, presence: true

  after_save :generate_external_id

  def generate_external_id
    self.update(external_id: "P-#{self.id.to_s.rjust(4, '0')}") if self.external_id.nil?
  end
end
