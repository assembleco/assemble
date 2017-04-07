# frozen_string_literal: true

require "json"

class BlockRun < ApplicationRecord
  INPUT_SCHEMA_NOT_SATISFIED = "input_schema_not_satisfied"

  belongs_to :user
  belongs_to :block

  validates :user, presence: true

  def execute
    if schema_satisfied?
      Tempfile.open("block_run.#{id}.input") do |f|
        File.write(f.to_path, input.to_json)
        command = "cat #{f.to_path} | fn run #{block.handle}/#{block.name}:#{block.version}"

        self.stdout = `#{command}`
        # self.stderr = stderr.join

        self.exit_status = 0
      end

      save!
    else
      update!(status: BlockRun::INPUT_SCHEMA_NOT_SATISFIED)
    end
  end

  def exit_status=(value)
    super(value)

    if value == 0
      self.status = :success
    elsif value
      self.status = :failure
    end
  end

  private

  def container_assemble_dir
    "/.assemble"
  end

  def schema_satisfied?
    JSON::Validator.validate(block.schema, input)
  end
end
