# frozen_string_literal: true

require "json"

class BlockRun < ApplicationRecord
  INPUT_SCHEMA_NOT_SATISFIED = "input_schema_not_satisfied"

  belongs_to :user
  belongs_to :block
  belongs_to :event

  validates :user, presence: true

  def execute
    if schema_satisfied?
      Dir.mktmpdir do |dir|
        File.write("#{dir}/Dockerfile", block.environment.dockerfile)
        image = Docker::Image.build_from_dir(dir)

        container = Docker::Container.create("Image" => image.id, "Tty" => true)
        container.start

        container.store_file(
          block.environment.source_path,
          block.source.gsub("\r\n", "\n"),
        )

        stdout, stderr, self.exit_status = container.exec(
          block.environment.command.split(" "),
          stdin: StringIO.new(input.to_json),
        )

        container.stop
        container.delete

        self.stdout = clean(stdout.join)
        self.stderr = clean(stderr.join)

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

  def clean(text)
    text.to_s.encode('UTF-8', {
      invalid: :replace,
      undef: :replace,
      replace: '?',
    })
  end

  def container_assemble_dir
    "/.assemble"
  end

  def schema_satisfied?
    JSON::Validator.validate(block.schema, input)
  end
end
