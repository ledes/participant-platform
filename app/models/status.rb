class Status < ApplicationRecord
  has_many :participants

  validates :status_name, presence: true
end
