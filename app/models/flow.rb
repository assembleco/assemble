# frozen_string_literal: true

class Flow < ApplicationRecord
  has_many :env_variables, dependent: :destroy
  has_many :runs, dependent: :destroy
end
