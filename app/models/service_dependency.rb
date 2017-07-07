class ServiceDependency < ApplicationRecord
  belongs_to :block
  belongs_to :service

  def credential_mapping
    service.credential_mapping
  end
end
