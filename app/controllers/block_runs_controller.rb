# frozen_string_literal: true

class BlockRunsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def show
    @block_run = BlockRun.find_by!(id: params[:block_run_id])
  end

  def create
    run = BlockRun.new(
      block: Block.find_by!(user: user, name: params[:blockname]),
      input: params[:data],
    )

    if run.save
      run.delay.execute
      notice = t(".success")

      respond_to do |format|
        format.html { redirect_to :back, notice: notice }
        format.text { render plain: notice }
      end
    else
      render text: run.errors.full_messages.to_yml
    end
  end

  private

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
