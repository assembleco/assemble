module AuthenticationStrategy
  class Google
    CREDENTIAL_MAPPING = {
      "GOOGLE_OAUTH_TOKEN" => "token",
    }.freeze

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
