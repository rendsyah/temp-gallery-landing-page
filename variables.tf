# DOCKER CONFIG
variable "image_name" {
  description = "Nama image Docker"
  type        = string
  default     = "gallery-web-dev"
}

variable "image_version" {
  description = "Versi image Docker"
  type        = string
  default     = "dev-1.0.0"
}

variable "dockerfile_path" {
  description = "Path ke Dockerfile"
  type        = string
  default     = "Dockerfile"
}

variable "docker_context" {
  description = "Direktori konteks build untuk Docker"
  type        = string
  default     = "."  # Default to current directory
}

variable "git_branch" {
  description = "Branch Git yang akan digunakan untuk fetch dan pull"
  type        = string
  default     = "dev"
}

variable "timezone" {
  description = "Timezone untuk container"
  type        = string
  default     = "Asia/Jakarta"
}

variable "app_port" {
  description = "Port di host untuk dipetakan ke port container"
  type        = string
  default     = "6000"
}

# Envar CONFIG
variable "app_base_url" {
  description = "Base URL untuk aplikasi"
  type        = string
  default     = "https://www2.hays-gallery.com"
}

variable "api_base_url" {
  description = "Base URL untuk API"
  type        = string
  default     = "http://gallery-api-dev:6002"
}