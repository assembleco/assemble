class Mutations::UpdateBlock < Mutations::Base
  def self.arguments(types)
    {
      id: !types.ID,
    }
  end

  def self.description
  end

  def self.return_type(types)
    !Types::Block
  end

  def execute
    block = Block.find(args[:id])

    block.update!(
    )

    block
  end
end
