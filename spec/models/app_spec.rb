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

  describe "#feeds" do
    it "returns all sources that are of class `Feed`" do
      app = create(:app)
      feed = create(:feed)
      create(:connection, app: app, source: feed, destination: create(:block))

      expect(app.feeds).to eq([feed])
    end
  end
end
