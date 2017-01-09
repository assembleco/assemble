# frozen_string_literal: true

class RunsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create
  skip_before_action :require_login, only: [:create], raise: false

  def create
    run = Run.new(block: block, args: params.to_unsafe_h.to_json)

    if run.save
      run.delay.execute
      render plain: "Run has been queued."
    else
      render(
        plain: "POSTed input does not match the schema for the block.
        Expected:
        #{block.schema}

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

  def block
    @block ||= Block.find_by!(name: params[:block_id])
  end
end
