class Mutations::UpdateBlock < Mutations::Base
  def self.arguments(types)
    {
      id: !types.ID,
      environment_id: types.ID,
    }
  end

  def self.description
  end

  def self.return_type
    !Types::Block
  end

  def execute
    block = Block.find(args[:id])

    block.update!(
      environment_id: args[:environment_id],
    )

    block
  end
end
