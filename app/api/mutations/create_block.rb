module Mutations
  class CreateBlock < Mutations::Base
    def self.arguments(types)
      {
      }
    end

    def self.description
      "Create a new block"
    end

    def self.return_type(types)
      Types::Block
    end

    def execute
      person = context[:session]

      Block.create!(
        description: "Click to edit the block's description",
        name: "Click to Rename",
        source: "# Click to edit the block's source\necho 'hello'",
        user: person,
        environment: Environment.first,
      )
    end
  end
end
