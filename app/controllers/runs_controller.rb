# frozen_string_literal: true

class RunsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    run = Run.new(flow: flow, args: params.to_unsafe_h.to_json)

    if run.save
      run.delay.execute
      render plain: "Run has been queued."
    else
      render(
        plain: "POSTed input does not match the schema for the flow.
        Expected:
        #{flow.schema}

        Got:
        #{params.to_unsafe_h.inspect}
        ",
        status: :unprocessable_entity,
      )
    end
  end

  def show
    @run = Run.find(params[:id])
  end

  private

  def flow
    @flow ||= Flow.find(params[:flow_id])
  end
end
