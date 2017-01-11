require 'rails_helper'

RSpec.describe App, type: :model do
  it { should belong_to :user }

  describe "validations" do
    subject { build(:app) }

    it { should validate_presence_of :user }
    it { should validate_uniqueness_of(:name).
         scoped_to(:user_id).
         case_insensitive }
  end

  describe "#to_param" do
    it "uses a slug based off the app's name" do
      app = build(:app, name: "App 1")

      expect(app.to_param).to eq("App 1")
    end
  end

  describe "#triggers" do
    it "returns all sources that are of class `Trigger`" do
      app = create(:app)
      trigger = create(:trigger)
      create(:connection, app: app, source: trigger, destination: create(:block))

      expect(app.triggers).to eq([trigger])
    end
  end
end
