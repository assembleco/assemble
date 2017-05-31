# frozen_string_literal: true

require "json"

class BlockRun < ApplicationRecord
  INPUT_SCHEMA_NOT_SATISFIED = "input_schema_not_satisfied"

  belongs_to :user
  belongs_to :block

  validates :user, presence: true

  def execute
    if schema_satisfied?
      Dir.mktmpdir do |dir|
        File.write("#{dir}/Dockerfile", block.dockerfile)
        image = Docker::Image.build_from_dir(dir)

        container = Docker::Container.create("Image" => image.id, "Tty" => true)
        container.start

        container.store_file(block.source_path, block.source.gsub("\r\n", "\n"))

        puts "Input:"
        puts  input.to_json

        output, errors, self.exit_status = container.exec(
          block.command.split(" "),
          stdin: StringIO.new(input.to_json),
        )

        container.stop
        container.delete

        self.stdout = output.join
        self.stderr = errors.join

        save
      end
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
