class Authentication < ApplicationRecord
  belongs_to :service
  belongs_to :user
end
