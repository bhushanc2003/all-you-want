terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "all-you-want-state-bucket"
    key     = "production/terraform.tfstate"
    region  = "ap-south-1"
    encrypt = true
  }
}

# Main provider (Mumbai - ap-south-1)
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "AllYouWant"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Secondary provider for CloudFront ACM SSL Certificate (N. Virginia - us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "AllYouWant"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
