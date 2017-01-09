require 'rails_helper'

RSpec.describe App, type: :model do
  it { should belong_to :user }

  describe "validations" do
    it { should validate_presence_of :user }
    it { should validate_uniqueness_of(:name).scoped_to(:user_id) }
  end
end
