output "s3_bucket_name" {
  value       = aws_s3_bucket.website_bucket.id
  description = "Name of the created S3 bucket"
}

output "s3_bucket_arn" {
  value       = aws_s3_bucket.website_bucket.arn
  description = "ARN of the created S3 bucket"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.s3_distribution.id
  description = "ID of the CloudFront distribution for CDN cache invalidation"
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
  description = "Public domain name of the CloudFront CDN endpoint"
}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions_role.arn
  description = "ARN of the IAM Role for GitHub Actions OIDC authentication"
}
