require "trigger_strategy/assemble/chrome_extension"
require "trigger_strategy/assemble/recurring"
require "trigger_strategy/github/push"

class Trigger < ApplicationRecord
  STRATEGIES = {
    "github.com" => {
      push: TriggerStrategy::GitHub::Push,
    },
    "assembleapp.co" => {
      recurring: TriggerStrategy::Assemble::Recurring,
      chrome_extension: TriggerStrategy::Assemble::ChromeExtension,
    }
  }.freeze

  belongs_to :service
  has_many :subscriptions

  validates :name, presence: true, uniqueness: { scope: :service_id }
  validates :service, presence: true

  validate :has_strategy
  validate :default_options_fulfill_schema

  def strategy
    @strategy ||= STRATEGIES.
      fetch(service.domain, {}).
      fetch(name.downcase.gsub(" ", "_").to_sym, nil)
  end

  private

  def has_strategy
    unless strategy
      errors.add(:name, "could not find a strategy for this service and trigger")
    end
  end

  def default_options_fulfill_schema
    unless JSON::Validator.validate(options_schema, default_options)
      errors.add(:default_options, "do not fulfill the schema for the options")
    end
  end
end
