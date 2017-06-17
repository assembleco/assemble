# frozen_string_literal: true

class BlockRunsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    run = BlockRun.new(
      block: block,
      input: params[:data] || {},
      user: current_user,
    )

    if run.save
      run.execute
      notice = t(".success")

      respond_to do |format|
        format.json {
          render plain: JSON.pretty_generate({
            status: :success,
            input: run.input,
            output: clean(run.stdout),
            errors: clean(run.stderr),
          })
        }
      end
    else
      render text: run.errors.full_messages.to_yml
    end
  end

  private

  def block
    @block ||= Block.find(params[:block_id])
  end

  def clean(input)
    input.to_s.encode('UTF-8', {
      invalid: :replace,
      undef: :replace,
      replace: '?',
    })
  end
end
