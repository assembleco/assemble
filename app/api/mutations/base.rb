class Mutations::Base
  def self.execute(object, args, context)
    new(object, args, context).execute
  end

  def initialize(object, args, context)
    @object = object
    @args = args
    @context = context
  end

  attr_reader :object, :args, :context
end
