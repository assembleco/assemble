class Environment < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  # validates :command, presence: true
  # validates :source_path, presence: true
  # validates :dockerfile, presence: true
end
