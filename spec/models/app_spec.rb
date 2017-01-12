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

  describe "#border_class" do
    it "returns a class image numbered 1 - 4" do
      app = create(:app, id: 1)

      expect(app.border_class).to eq("app-border-1")
    end

    it "returns a class image numbered 1 - 4" do
      app = create(:app, id: 4)

      expect(app.border_class).to eq("app-border-4")
    end

    it "mods the id to make sure it's using valid classes" do
      app = create(:app, id: 5)

      expect(app.border_class).to eq("app-border-1")
    end
  end

  describe "#to_param" do
    it "uses a slug based off the app's name" do
      app = build(:app, name: "App 1")

      expect(app.to_param).to eq("App 1")
    end
  end

  describe "#feeds" do
    it "returns all sources that are of class `Feed`" do
      app = create(:app)
      feed = create(:feed)
      create(:connection, app: app, source: feed, destination: create(:block))

      expect(app.feeds).to eq([feed])
    end
  end
end
