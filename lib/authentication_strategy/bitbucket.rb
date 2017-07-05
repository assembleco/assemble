module AuthenticationStrategy
  class BitBucket
    def initialize(oauth_payload)
      @oauth_payload = oauth_payload
    end

    attr_reader :oauth_payload

    def credentials
      {
        token: oauth_payload["credentials"]["token"]
      }
    end
  end
end
