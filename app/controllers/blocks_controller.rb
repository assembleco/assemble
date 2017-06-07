# frozen_string_literal: true

require "docker"

class BlocksController < ApplicationController
  helper_method :user

  skip_before_action :require_login, only: [:index, :show]
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    respond_to do |format|
      format.html
      format.json {
        render json: {
          current_user: current_user.as_json,
          blocks: Block.all.as_json,
        }
      }
    end
  end

  def show
    @block = Block.find_by!(name: params[:blockname], user: user)
    editable = current_user == @block.user

    respond_to do |format|
      format.html
      format.json {
        render json: {
          editable: editable,
          initial_input_data: @block.runs.where(user: current_user).last.try(:input),
          run_block_url: block_runs_url(@block.user, @block),
          user_api_key: current_user.try(:api_key),
          event_settings: {
            repo: "assembleapp/registry",
            branch: "master",
          },
        }.merge(@block.as_json)
      }
    end
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

  def update
    @block = Block.find_by!(user: user, name: params[:blockname])

    if @block.update(block_params)
      respond_to do |format|
        format.json {
          render json: @block.as_json
        }
        format.html {
          redirect_to block_path(@block.user, @block), notice: t(".success")
        }
      end
    else
      format.json {
        render json: @block.errors.as_json
      }
      format.html {
        flash.now[:alert] = t(".failure")
        render :edit
      }
    end
  end

  def destroy
    block = Block.find_by!(user: user, name: params[:blockname])
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

  def user
    @user ||= User.find_by!(handle: params[:handle])
  end
end
