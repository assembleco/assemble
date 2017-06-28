require "rails_helper"

RSpec.describe Mutations::CreateSubscription do
  it "creates a subscription if none exists yet" do
    block = create(:block)
    new_trigger = create(:trigger)
    person = create(:user)

    Mutations::CreateSubscription.execute(
      nil,
      { block_id: block.id, trigger_id: new_trigger.id },
      { session: person },
    )

    expect(Subscription.count).to eq(1)
    expect(block.subscriptions.first.trigger).to eq(new_trigger)
  end

  it "removes an existing subscription it it exists for the user" do
    subscription = create(:subscription)
    block = subscription.block
    service = create(:service, domain: "assembleapp.co", name: "Time")
    new_trigger = create(:trigger, service: service, name: "recurring")
    person = subscription.user

    Mutations::CreateSubscription.execute(
      nil,
      { block_id: block.id, trigger_id: new_trigger.id },
      { session: person },
    )

    expect(Subscription.count).to eq(1)
    expect { subscription.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end
end
