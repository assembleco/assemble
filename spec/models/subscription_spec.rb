require 'rails_helper'

RSpec.describe Subscription, type: :model do
  describe "#trigger=" do
    it "copies over the default options from the trigger" do
      default_options = { "repo" => "foobar" }
      trigger = create(:trigger, default_options: default_options)
      subscription = Subscription.new

      subscription.trigger = trigger

      expect(subscription.trigger_options).to eq(default_options)
    end
  end
end
