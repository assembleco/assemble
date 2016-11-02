# frozen_string_literal: true

Rails.application.routes.draw do
  resources :flows do
    resources :runs, only: [:create, :show]
    resources :env_variables, only: [:new, :create, :destroy]
  end

  resources :triggers, only: [:index, :new, :create, :edit, :update] do
    resources :events, only: [:create]
  end
end
