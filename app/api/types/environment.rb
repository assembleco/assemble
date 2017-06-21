Types::Environment = GraphQL::ObjectType.define do
  name "Environment"
  description "A self-contained environment for block scripts to run in"

  field :id, !types.ID
  field :command, types.String
  field :dockerfile, types.String
  field :name, types.String
  field :source_path, types.String
end
