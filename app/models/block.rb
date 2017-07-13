# frozen_string_literal: true

class Block < ApplicationRecord
  belongs_to :user
  belongs_to :environment

  has_many :runs, dependent: :destroy, class_name: "BlockRun"
  has_many :subscriptions, dependent: :destroy
  has_many :service_dependencies, dependent: :destroy

  validates :user, presence: true

  def active
    false
  end

  def handle
    user.handle
  end
end
