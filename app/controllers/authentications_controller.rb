class AuthenticationsController < ApplicationController
  skip_before_action :require_login, only: [:create], raise: false

  PROVIDER_DOMAIN_MAPPING = {
    bitbucket: "bitbucket.org",
    github: "github.com",
  }.with_indifferent_access.freeze

  def create
    authentication = Authentication.find_by(
      service: service,
      user: current_user,
    )

    credentials = service.parse_oauth_payload(auth_hash)

    if(authentication)
      authentication.update(credentials: credentials)
    else
      Authentication.create!(
        service: service,
        user: current_user,
        credentials: credentials,
      )
    end

    if request.env["omniauth.origin"]
      redirect_to request.env["omniauth.origin"]
    else
      redirect_to :root
    end
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end

  def service
    service ||= Service.find_by(
      domain: PROVIDER_DOMAIN_MAPPING.fetch(provider)
    )
  end

  def provider
    params.fetch(:provider).to_s
  end
end
