require "thor"
require_relative "assemble_cli/config"

module AssembleCLI
  class CLI < Thor
    desc :validate, "Check the current directory's block definition for errors"
    def validate
      status = nil

      if File.exists?(".assemble.yml")
        parsed = YAML.parse(File.read(".assemble.yml"))

        if parsed && valid_assemble_configuration?(parsed)
          status = "valid"
        else
          status = "invalid"
        end
      else
        status = "not found"
      end

      puts ".assemble.yml: #{status}"
    end

    private

    def valid_assemble_configuration?(config)
      AssembleCLI::Config.new(config).valid?
    end
  end
end
