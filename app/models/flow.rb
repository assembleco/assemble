# frozen_string_literal: true

class Flow < ApplicationRecord
  has_many :env_variables, dependent: :destroy
end
