terraform {
  # backend "s3" {}
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.3.0"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = var.profile
}

# Module
module "terraform_remote_state_s3" {
  source = "../"

  providers = {
    aws = aws
  }

  kms_encryption = true
  remote_lock    = true
}