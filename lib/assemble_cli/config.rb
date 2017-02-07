module AssembleCLI
  class Config
    VALIDATION_ERROR_MESSAGES = {
      is_version_blank?: "does not specify a version",
      is_version_unsupported?: "specified version is not supported",
      is_block_undefined?: "could not find 'block' configuration",
      is_build_unsupported?: "currently only supports building from the current directory ('.')",
      is_command_blank?: "could not find startup command for the block",
    }.freeze

    def initialize(config)
      @config = config
    end

    attr_reader :config

    def valid?
      errors.empty?
    end

    def errors
      VALIDATION_ERROR_MESSAGES.
        select { |validation, _| send(validation) }.
        values
    end

    private

    def is_version_blank?
      config[:assemble].nil? || config[:assemble][:version].nil?
    end

    def is_version_unsupported?
      config[:assemble] && config[:assemble][:version] != 0
    end

    def is_block_undefined?
      config[:block].nil?
    end

    def is_build_unsupported?
      config[:block] && config[:block][:build] != "."
    end

    def is_command_blank?
      config[:block] && config[:block][:command].nil?
    end
  end
end
