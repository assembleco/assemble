class ClaimsController < ApplicationController
  skip_before_action :require_login, only: [:dockerfile]

  def create
    docker_id = params[:handle]
    image_name = "#{docker_id}/assemble_claim"
    image = pull_image(image_name)

    if image
      claimed_handle = lookup_env_var(image, "ASSEMBLE_USER")
      claimed_user = User.find_by!(handle: claimed_handle)

      if claimed_user == current_user
        claim = Claim.create!(user: claimed_user, handle: docker_id)
        render json: {
          status: :success,
          claimed_user: claimed_user,
        }
      else
        render json: {
          status: :failure,
          message: "This Docker ID has been claimed by #{claimed_handle}",
        }
      end
    else
      render json: {
        status: :failure,
        message: "Could not find image #{image_name}",
      }
    end
  end

  def dockerfile
    render plain: dockerfile_for(user)
  end

  private

  def user
    @user ||= User.find_by!(handle: params[:handle])
  end

  def dockerfile_for(user)
<<-DOCKERFILE
FROM scratch
ENV ASSEMBLE_USER #{user.handle}
DOCKERFILE
  end

  def lookup_env_var(image, var)
    image.json["Config"]["Env"].find { |env|
      env.starts_with?("#{var}=")
    }.
    split("=").
    last
  end

  def pull_image(image_name)
    begin
      Docker::Image.create("fromImage" => image_name)
    rescue Docker::Error::NotFoundError
      nil
    end
  end
end
