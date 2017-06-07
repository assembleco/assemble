# frozen_string_literal: true

require "docker"

class BlocksController < ApplicationController
  skip_before_action :require_login, only: [:index, :show]
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
  end

  def show
    @block = Block.find(params[:id])
    editable = current_user == @block.user
  end

  def create
    @block = Block.new(block_params)

    if @block.save
      respond_to do |format|
        format.json {
          render json: @block.as_json
        }
        format.html {
          redirect_to block_path(@block.user, @block), notice: t(".success")
        }
      end
    else
      render json: @block.errors.full_messages
    end
  end

  def update
    @block = Block.find(params[:id])

    if @block.update(block_params)
      render json: @block.as_json
    else
      render json: @block.errors.as_json
    end
  end

  def destroy
    block = Block.find(params[:id])
    block.destroy!

    respond_to do |format|
      format.json { render json: { status: :success } }
    end
  end

  private

  def block_params
    params.require(:block).permit(
      :description,
      :dockerfile,
      :source,
      :source_path,
      :command,
      :handle,
      :name,
      :schema_json,
    ).merge(user: current_user)
  end
end
