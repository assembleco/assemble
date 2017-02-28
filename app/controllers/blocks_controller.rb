# frozen_string_literal: true

require "docker"

class BlocksController < ApplicationController
  helper_method :user, :claim

  skip_before_action :require_login, only: [:show]
  skip_before_action :verify_authenticity_token, only: [:create]

  def show
    @block = Block.find_by!(name: params[:blockname], claim: claim) end

  def new
    @block = Block.new()
  end

  def create
    @block = Block.new(block_params)

    if @block.save
      respond_to do |format|
        format.json {
          render json: @block.as_json
        }
        format.html {
          redirect_to block_path(@block.claim, @block), notice: t(".success")
        }
      end
    else
      respond_to do |format|
        format.json {
          render json: @block.errors.full_messages
        }
        format.html {
          flash.now[:alert] = t(".failure")
          render :new
        }
      end
    end
  end

  def edit
    @block = Block.find_by!(claim: claim, name: params[:blockname])
  end

  def update
    @block = Block.find_by!(claim: claim, name: params[:blockname])

    if @block.update(block_params)
      redirect_to block_path(@block.claim, @block), notice: t(".success")
    else
      flash.now[:alert] = t(".failure")
      render :edit
    end
  end

  private

  def block_params
    params.require(:block).permit(
      :description,
      :handle,
      :name,
      :schema_json,
    )
  end

  def claim
    @claim ||= Claim.find_by!(handle: params[:handle])
  end

  def user
    @user ||= claim.user
  end
end
