# frozen_string_literal: true

require "docker"

class BlocksController < ApplicationController
  skip_before_action :require_login, only: [:index, :show]
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    render html: "", layout: true
  end

  def show
    render html: "", layout: true
  end

  def update
    @block = Block.find(params[:id])

    if @block.user == current_user
      if @block.update(block_params)
        render json: @block.as_json
      else
        render json: @block.errors.as_json
      end
    else
      render status: :unauthorized, json: {
        error: "You do not have permission to edit this block.",
      }
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
