require "assemble_cli/config"

describe AssembleCLI::Config do
  describe "#valid?" do
    it "is invalid if the version does not exist" do
      settings = {}
      config = AssembleCLI::Config.new(settings)

      expect(config).not_to be_valid
      expect(config.errors).to include("does not specify a version")
    end

    it "is invalid if the version is not 0" do
      settings = { assemble: { version: 1 } }
      config = AssembleCLI::Config.new(settings)

      expect(config).not_to be_valid
      expect(config.errors).to include("specified version is not supported")
    end

    it "is invalid if the block section is not present" do
      settings = { assemble: { version: 0 } }
      config = AssembleCLI::Config.new(settings)

      expect(config).not_to be_valid
      expect(config.errors).to include("could not find 'block' configuration")
    end

    it "is invalid if block.build is not ." do
      settings = { block: { build: './relative_dir' } }
      config = AssembleCLI::Config.new(settings)

      expect(config).not_to be_valid
      expect(config.errors).to include("currently only supports building from the current directory ('.')")
    end

    it "is invalid if block.command is not specified" do
      settings = { block: { build: '.' } }
      config = AssembleCLI::Config.new(settings)

      expect(config).not_to be_valid
      expect(config.errors).to include("could not find startup command for the block")
    end

    it "is true if there are no issues" do
      settings = {
        assemble: { version: 0 },
        block: {
          build: ".",
          command: "ls",
        }
      }

      config = AssembleCLI::Config.new(settings)

      expect(config).to be_valid
      expect(config.errors).to be_empty
    end
  end
end
