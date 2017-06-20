Types::ArbitraryObject = GraphQL::ScalarType.define do
  name "ArbitraryObject"
  description "Any JSON object with arbitrary keys"

  coerce_input ->(value, ctx) { value }
  coerce_result ->(value, ctx) { value }
end
