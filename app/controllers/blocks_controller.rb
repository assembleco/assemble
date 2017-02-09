# frozen_string_literal: true

require "docker"

class BlocksController < ApplicationController
  helper_method :user

  def index
    @blocks = user.blocks
  end

  def show
    @block = Block.find_by!(user: user, name: params[:blockname])
  end

  def new
    @block = Block.new(user: current_user)
  end

  def create
    @block = Block.new(block_params)

    if @block.save
      redirect_to block_path(@block.user, @block), notice: t(".success")
    else
      flash.now[:alert] = t(".failure")
      render :new
    end
  end

  def edit
    @block = Block.find_by!(user: user, name: params[:blockname])
  end

  def update
    @block = Block.find_by!(user: user, name: params[:blockname])

    if @block.update(block_params)
      redirect_to block_path(@block.user, @block), notice: t(".success")
    else
      flash.now[:alert] = t(".failure")
      render :edit
    end
  end

  private

  def block_params
    params.require(:block).permit(
      :description,
      :github_repo,
      :name,
      :schema_json,
    ).merge(user: current_user)
  end

  def user
    @user ||= User.find_by!(username: params[:username])
  end
end
