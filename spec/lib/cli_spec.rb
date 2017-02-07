require "assemble/cli"

describe "assemble command-line interface" do
  describe "with no subcommand" do
    it "lists out commands" do
      expect {
        assemble
      }.to output(/Commands:$/).to_stdout
    end

    it "includes the 'validate' subcommand" do
      expect {
        assemble
      }.to output(/validate/).to_stdout
    end
  end

  describe "assemble validate" do
    it "fails if there is no assemble.yml file" do
      in_temp_directory do
        expect {
          assemble "validate"
        }.to output(/.assemble.yml: not found/).to_stdout
      end
    end

    it "fails if there is an invalid assemble.yml file" do
      in_temp_directory do
        FileUtils.touch(".assemble.yml")

        expect {
          assemble "validate"
        }.to output(/.assemble.yml: invalid/).to_stdout
      end
    end

    it "fails if the assemble.yml file has an invalid version" do
      in_temp_directory do
        File.write(".assemble.yml", { assemble: { version: -1 } }.to_yaml)

        expect {
          assemble "validate"
        }.to output(/.assemble.yml: invalid/).to_stdout
      end
    end
  end

  private

  def assemble(*args)
    AssembleCLI::CLI.start(args)
  end

  def in_temp_directory
    Dir.mktmpdir do |dir|
      Dir.chdir(dir) do
        yield
      end
    end
  end
end
