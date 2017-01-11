class Connection < ApplicationRecord
  belongs_to :app
  belongs_to :source, polymorphic: true
  belongs_to :destination, polymorphic: true
end
