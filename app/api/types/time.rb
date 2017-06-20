Types::Time = GraphQL::ScalarType.define do
  name "Time"
  description "Time, represented in ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)"

  coerce_input ->(value, ctx) { DateTime.parse(value) }
  coerce_result ->(value, ctx) { value.iso8601 }
end
