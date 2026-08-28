# All You Want — Free Web & Developer Utility Directory

A modern, privacy-first web utility platform built with **React 19 + Vite 6 + Tailwind CSS v4**, provisioned via **Terraform** on **AWS S3 + CloudFront CDN**, and deployed automatically using **GitHub Actions with AWS OIDC (OpenID Connect)**.

---

## 📁 Repository Structure

```
├── app/                      # React 19 + Vite 6 Frontend Application
│   ├── index.html            # Entry HTML & Schema.org JSON-LD SEO tags
│   ├── package.json          # Dependencies (js-yaml, fast-xml-parser, lucide-react)
│   ├── vite.config.js        # Vite configuration
│   └── src/                  # Components, tools, and CSS styles
│       ├── App.jsx           # Main routing & state
│       ├── components/       # Header, Footer, Hero, Search Modal, Tool Wrapper
│       │   └── tools/        # JSON ⇆ YAML, XML ⇆ JSON, Base64, JWT, Glassmorphism
│       └── data/             # Tools catalog dataset
│
├── terraform/                # Infrastructure as Code (IaC)
│   ├── main.tf               # AWS S3 Bucket, OAC, and CloudFront Distribution
│   ├── oidc.tf               # GitHub Actions OIDC Provider & IAM Role (Passwordless Auth)
│   ├── variables.tf          # Configurable variables (region, bucket_name, github_repo)
│   ├── outputs.tf            # Infrastructure outputs (bucket name, CDN distribution ID, role ARN)
│   ├── providers.tf          # AWS provider requirements
│   └── terraform.tfvars.example
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD Pipeline (OIDC Auth -> Terraform Apply -> Build -> S3 Sync -> CloudFront Invalidation)
│
└── FUNCTIONALITIES.md        # Master tracking roadmap for implemented & upcoming utilities
```

---

## 🔐 AWS OIDC (OpenID Connect) Authentication

This project uses **passwordless AWS OIDC authentication** for GitHub Actions instead of static access keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`).

### How It Works:
1. `terraform/oidc.tf` provisions an OpenID Connect provider for `https://token.actions.githubusercontent.com`.
2. An IAM role (`all-you-want-web-app-bucket-github-actions-role`) is created with a trust policy restricting access to your GitHub repository.
3. GitHub Actions requests a short-lived JSON Web Token (JWT) from GitHub's OIDC service, which AWS exchanges for temporary IAM credentials via `sts:AssumeRoleWithWebIdentity`.

### Required GitHub Secrets:
Set the following in GitHub under **Settings > Secrets and variables > Actions**:
- `AWS_ROLE_TO_ASSUME`: The ARN of the IAM role created by Terraform (`output.github_actions_role_arn`).
- `AWS_REGION` *(optional, defaults to `us-east-1`)*.

---

## 🚀 Local Development

### 1. Run Frontend Application
```bash
cd app
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 2. Build for Production
```bash
cd app
npm run build
```
Output static files are saved to `app/dist/`.

---

## 🏗️ Terraform Infrastructure

To initialize & inspect Terraform locally:
```bash
cd terraform
terraform init
terraform plan
```
