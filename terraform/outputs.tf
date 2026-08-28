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

output "acm_certificate_dns_validation_records" {
  value       = var.use_custom_domain ? aws_acm_certificate.cert[0].domain_validation_options : []
  description = "DNS CNAME records to add in GoDaddy for ACM SSL certificate validation"
}
