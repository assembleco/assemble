# frozen_string_literal: true

class TriggersController < ApplicationController
  def index
    @triggers = Trigger.all
  end

  def new
    @trigger = Trigger.new
  end

  def create
    @trigger = Trigger.new(trigger_params)

    if @trigger.save
      redirect_to triggers_path
    else
      render :new
    end
  end

  def edit
    @trigger = Trigger.find_by!(name: params[:id])
  end

  def update
    @trigger = Trigger.find_by!(name: params[:id])

    if @trigger.update(trigger_params)
      redirect_to triggers_path
    else
      render :edit
    end
  end

  private

  def trigger_params
    params.require(:trigger).permit(:name, :schema)
  end
end
