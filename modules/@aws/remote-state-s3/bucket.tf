# ==========================================================
# S3 Buckets Resources
# ==========================================================

resource "aws_s3_bucket" "terraform_state" {
  bucket_prefix = var.state_bucket_prefix
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = var.versioning
  }

}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = var.kms_encryption ? aws_kms_key.terraform_state[0].key_id : null
      sse_algorithm     = var.kms_encryption ? "aws:kms" : "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ==========================================================
# KMS KEY Resources
# ==========================================================

resource "aws_kms_key" "terraform_state" {
  count                   = var.kms_encryption ? 1 : 0
  deletion_window_in_days = var.kms_options.deletion_window_in_days
  enable_key_rotation     = var.kms_options.enable_key_rotation
  description             = var.kms_options.description
}




