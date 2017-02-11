# frozen_string_literal: true

class BlockRunsController < ApplicationController
  def show
    @block_run = BlockRun.find_by!(id: params[:block_run_id])
  end

  private

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
