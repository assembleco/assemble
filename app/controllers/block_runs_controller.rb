# frozen_string_literal: true

class BlockRunsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :require_login, only: [:create, :show]

  def show
    @block_run = BlockRun.find_by!(id: params[:block_run_id])

    respond_to do |format|
      format.json do
        render json: @block_run
      end
    end
  end

  def create
    run = BlockRun.new(
      block: block,
      input: params[:data],
    )

    if run.save
      run.delay.execute
      notice = t(".success")

      respond_to do |format|
        format.json {
          render plain: JSON.pretty_generate({
            status: :success,
            message: "Running block `#{user.username}/#{block.name}`",
            url: block_run_url(user, block, run),
          })
        }
      end
    else
      render text: run.errors.full_messages.to_yml
    end
  end

  private

  def block
    @block ||= Block.find_by!(user: user, name: params[:blockname])
  end

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
