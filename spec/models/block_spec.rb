require 'rails_helper'

RSpec.describe Block, type: :model do
  it { should belong_to :user }

  describe "validations" do
    subject { build(:block) }

    it { should validate_presence_of(:user) }
  end
end
