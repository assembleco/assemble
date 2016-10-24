# frozen_string_literal: true

Rails.application.routes.draw do
  resources :flows do
    resources :runs, only: [:create]
    resources :env_variables, only: [:new, :create]
  end
end
