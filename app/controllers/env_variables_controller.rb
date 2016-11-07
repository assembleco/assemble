# frozen_string_literal: true

class EnvVariablesController < ApplicationController
  def new
    @env = EnvVariable.new(flow: flow)
  end

  def create
    @env = EnvVariable.new(env_variable_params)

    if @env.save
      redirect_to [@env.user, @env.flow]
    else
      render :new
    end
  end

  def destroy
    env = EnvVariable.find(params[:id])
    flow = env.flow
    env.destroy!
    redirect_to [flow.user, flow]
  end

  private

  def flow
    @flow ||= Flow.find_by!(name: params[:flow_id])
  end

  def env_variable_params
    params.
      require(:env_variable).
      permit(:key, :value).
      merge(flow: flow)
  end
end
