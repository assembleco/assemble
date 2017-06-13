module TriggerStrategy
  module GitHub
    class Push
      def initialize(authentication, options)
        @authentication = authentication
        @options = option
      end

      def activate
        raise NotImplementedError
      end

      def active?
        raise NotImplementedError
      end

      def deactivate
        raise NotImplementedError
      end

      def record_event(payload)
        raise NotImplementedError
      end
    end
  end
end
