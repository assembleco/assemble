class Subscription < ApplicationRecord
  belongs_to :block
  belongs_to :trigger
  belongs_to :user

  validates :block, presence: true
  validates :trigger, presence: true
  validates :user, presence: true

  has_many :events

  def activate
    unless trigger_options_satisfied?
      raise ArgumentError, "missing some required trigger options"
    end

    update(
      remote_webhook_id: service.activate,
      activated_at: Time.current,
      deactivated_at: nil,
    )
  end

  def deactivate
    if(service.deactivate(remote_webhook_id))
      update(deactivated_at: Time.current)
    end
  end

  def record_event(webhook_params)
    service.record_event(webhook_params, self)
  end

  private

  def trigger_options_satisfied?
    JSON::Validator.validate(trigger.options_schema, trigger_options)
  end

  def service
    @service ||= trigger.strategy.new(user, trigger_options)
  end
end
