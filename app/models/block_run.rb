# frozen_string_literal: true

require "json"

class BlockRun < ApplicationRecord
  DEPENDENT_SERVICES_NOT_SATISFIED = "You are not signed into the necessary third-party services"

  belongs_to :user
  belongs_to :block
  belongs_to :event

  validates :user, presence: true

  def execute
    unless authorizations_satisfied?
      update!(status: BlockRun::DEPENDENT_SERVICES_NOT_SATISFIED)
      return
    end

    output_dir = "public/run_outputs/#{id}"
    host_dir = File.join(ENV.fetch("HOST_APPLICATION_DIR"), output_dir)

    `mkdir -p #{Rails.root.join(output_dir)}`

    Dir.mktmpdir do |dir|
      File.write("#{dir}/Dockerfile", block.dockerfile)
      image = Docker::Image.build_from_dir(dir)

      container = Docker::Container.create(
        "Env" => container_env_variables,
        "Image" => image.id,
        "Tty" => true,
      )

      container.start(
        'Binds' => ["#{host_dir}:/output"]
      )

      container.store_file(
        block.source_path,
        block.source.gsub("\r\n", "\n"),
      )

      stdout, stderr, self.exit_status = container.exec(
        block.command.split(" "),
        stdin: StringIO.new(input.to_json),
      )

      container.stop
      container.delete

      self.stdout = clean(stdout.join)
      self.stderr = clean(stderr.join)

      save
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

  def output_files
    public_dir = "public"
    run_path = "run_outputs/#{id}/"
    full_path = Rails.root.join(public_dir, run_path)

    Dir.glob(full_path.join("*")).map do |file|
      # Strip out the directory prefix
      filename = file[full_path.to_s.length .. -1]
      url = "//" + File.join(ENV.fetch("APPLICATION_HOST"), run_path, filename)

      [filename, url]
    end.to_h
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

  def authorizations_satisfied?
    block.service_dependencies.all? do |dependency|
      user.authentications.exists?(service: dependency.service)
    end
  end

  def container_env_variables
    block.service_dependencies.map do |dependency|
      authentication = user.authentications.find_by(service: dependency.service)

      dependency.credential_mapping.map do |env_variable_name, credential_name|
        "#{env_variable_name}=#{authentication.credentials[credential_name]}"
      end
    end.flatten.compact
  end
end
