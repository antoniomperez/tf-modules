# ==========================================================
# S3 Buckets Configuration Variables
# ==========================================================
variable "state_bucket_prefix" {
  type        = string
  description = "it creates a prefix for the state bucket name to use with a combination of number to be unique"
  default     = "terraform-remote-state-"
}

variable "force_destroy" {
  type        = bool
  description = "A boolean that indicates all objects (including any locked objects) should be deleted from the bucket so that the bucket can be destroyed without error. These objects are not recoverable."
  default     = false
}

variable "versioning" {
  type        = string
  description = "Enabled S3 Bucket version control"
  default     = "Enabled"
  validation {
    condition     = contains(["Enabled", "Suspended"], var.versioning)
    error_message = "The only allowed values are \"Enabled\" or \"Suspended\"."
  }
}

# ==========================================================
# KMS Configuration Variables
# ==========================================================

variable "kms_encryption" {
  type        = bool
  description = "Enabled AWS KMS encryption key instead of the default one which is AES256 encryption"
  default     = false
}

variable "kms_options" {
  type = object({
    deletion_window_in_days = number
    enable_key_rotation     = bool
    description             = string
  })
  default = {
    deletion_window_in_days = 30
    enable_key_rotation     = false
    description             = "KMS Key for terraform remote state"
  }
}

# ==========================================================
# DynamoDB Configuration Variables
# ==========================================================

variable "remote_state_dynamodb_table_name" {
  type        = string
  description = "The table name where we will store de LockID to block the state"
  default     = "terraform-remote-state"
}

variable "remote_lock" {
  type        = bool
  description = "Enable the DynamoDb table to lock the state"
  default     = false
}