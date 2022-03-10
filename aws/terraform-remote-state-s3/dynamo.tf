# ==========================================================
# DynamoDB Table 
# ==========================================================

resource "aws_dynamodb_table" "terraform_locks" {
  count        = var.remote_lock ? 1 : 0
  name         = var.remote_state_dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}