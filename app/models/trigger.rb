require "trigger_strategy/github/push"

class Trigger < ApplicationRecord
  STRATEGIES = {
    "github.com" => {
      push: TriggerStrategy::GitHub::Push
    },
  }.freeze

  belongs_to :service

  validates :name, presence: true, uniqueness: { scope: :service_id }
  validates :service, presence: true

  validate :has_strategy

  private

  def has_strategy
    unless strategy
      errors.add(:name, "could not find a strategy for this service and trigger")
    end
  end

  def strategy
    STRATEGIES.fetch(service.domain, {}).fetch(name.downcase.to_sym, nil)
  end
end
