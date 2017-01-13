# frozen_string_literal: true

class BlockRunsController < ApplicationController
  def show
    @block_run = BlockRun.find_by!(app: app, id: params[:block_run_id])
  end

  private

  def app
    @app ||= App.find_by!(user: user, name: params[:appname])
  end

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
