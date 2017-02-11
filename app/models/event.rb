class Event < ApplicationRecord
  belongs_to :feed

  def save
    super
  end
end
