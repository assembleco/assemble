# frozen_string_literal: true

class BlockRunsController < ApplicationController
  def show
    @block_run = BlockRun.find_by!(block: block, id: params[:block_run_id])
  end

  private

  def block
    @block ||= Block.find_by!(user: user, name: params[:blockname])
  end

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
