# frozen_string_literal: true

class Flow < ApplicationRecord
  belongs_to :trigger

  has_many :env_variables, dependent: :destroy
  has_many :runs, dependent: :destroy

  def to_param
    name
  end
end
