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
        name: "Click to Rename",
        description: "Click to edit the block's description",
        source: "# Click to edit the block's source\necho 'hello'",
        user: person,
        command: "ruby /app/script.rb",
        dockerfile: "FROM ruby:latest",
        source_path: "/app/script.rb",
      )
    end
  end
end
