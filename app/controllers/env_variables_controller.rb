# frozen_string_literal: true

class EnvVariablesController < ApplicationController
  def new
    @env = EnvVariable.new(block: block)
  end

  def create
    @env = EnvVariable.new(env_variable_params)

    if @env.save
      redirect_to block_path(@env.user, @env.block)
    else
      render :new
    end
  end

  def destroy
    env = EnvVariable.find(params[:id])
    block = env.block
    env.destroy!
    redirect_to block_path(block.user, block)
  end

  private

  def block
    @block ||= Block.find_by!(user: user, name: params[:blockname])
  end

  def user
    @user ||= User.find_by!(handle: params[:handle])
  end

  def env_variable_params
    params.
      require(:env_variable).
      permit(:key, :value).
      merge(block: block)
  end
end
