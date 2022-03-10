output "remote_state_bucket" {
  value = module.terraform_remote_state_s3.remote_state_bucket
}

output "remote_state_table" {
  value = module.terraform_remote_state_s3.dynamodb_table
}