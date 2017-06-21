class Mutations::CreateRun < Mutations::Base
  def self.arguments(types)
    {
      block_id: !types.ID,
      data: !Types::ArbitraryObject,
    }
  end

  def self.description
    "Run a block with custom input data"
  end

  def self.return_type
    !Types::Run
  end

  def execute
    block = Block.find(args[:block_id])

    run = BlockRun.create!(
      block: block,
      input: args[:data],
      user: context[:session],
    )
    run.execute

    run
  end
end
