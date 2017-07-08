MutationRoot = GraphQL::ObjectType.define do
  name "Mutation"

  [
    Mutations::ActivateSubscription,
    Mutations::CreateBlock,
    Mutations::CreateChromeExtensionEvent,
    Mutations::CreateRun,
    Mutations::CreateServiceDependency,
    Mutations::CreateSubscription,
    Mutations::DeactivateSubscription,
    Mutations::DestroyServiceDependency,
    Mutations::DestroySubscription,
    Mutations::UpdateBlock,
    Mutations::UpdateSubscription,
  ].each do |mutation|
    field File.basename(mutation.to_s.underscore), mutation.return_type(types) do
      description mutation.description

      mutation.arguments(types).each do |arg, type|
        argument arg, type
      end

      resolve Proc.new(&mutation.method(:execute))
    end
  end
end
