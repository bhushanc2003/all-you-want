variable "aws_region" {
  type        = string
  default     = "ap-south-1"
  description = "AWS region for infrastructure resources"
}

variable "bucket_name" {
  type        = string
  default     = "all-you-want-web-app-bucket"
  description = "Name of the S3 bucket to store static frontend assets"
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Deployment environment name (e.g. production, staging)"
}

variable "github_repo" {
  type        = string
  default     = "bhushanc2003/all-you-want"
  description = "GitHub repository in format org/repo for OIDC trust restriction"
}

variable "domain_name" {
  type        = string
  default     = "allyouwant.xyz"
  description = "Custom domain name for the web app (e.g. allyouwant.xyz)"
}

variable "use_custom_domain" {
  type        = bool
  default     = true
  description = "Whether to attach custom domain and request ACM SSL certificate"
}
