terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Stage 1: Git pull update kode dari branch yang ditentukan
resource "null_resource" "git_pull" {
  provisioner "local-exec" {
    command = <<EOT
      git fetch origin ${var.git_branch}
      git diff --exit-code origin/${var.git_branch}
      if [ $? -ne 0 ]; then
        echo "Changes detected, pulling updates..."
        git pull origin ${var.git_branch}
      else
        echo "No changes detected, skipping pull."
      fi
    EOT
    working_dir = "${path.module}"
  }

  triggers = {
    always_run = timestamp()
  }
}

# Stage 2: Hapus docker image lama jika ada
resource "null_resource" "remove_old_image" {
  provisioner "local-exec" {
    command = <<EOT
      # Hentikan dan hapus container yang menggunakan image
      echo "Stopping and removing containers using image: ${var.image_name}:${var.image_version}"
      docker ps -q --filter ancestor=${var.image_name}:${var.image_version} | xargs -r docker stop
      docker ps -a -q --filter ancestor=${var.image_name}:${var.image_version} | xargs -r docker rm

      # Hapus image lama
      echo "Removing old Docker image: ${var.image_name}:${var.image_version}"
      docker rmi -f ${var.image_name}:${var.image_version} || echo "No old image to remove"
    EOT
  }
  depends_on = [null_resource.git_pull]
}

# Stage 4: Build Docker image baru menggunakan konteks dan Dockerfile yang ditentukan
resource "docker_image" "my_image" {
  name = "${var.image_name}:${var.image_version}"
  build {
    context    = "${var.docker_context}"
    dockerfile = "${var.dockerfile_path}"
  }
}

# Stage 5: Jalankan container baru menggunakan docker compose up dengan environment variables dari Terraform
resource "null_resource" "docker_compose_up" {
  provisioner "local-exec" {
    command = <<EOT
      export IMAGE_NAME=${var.image_name}
      export IMAGE_VERSION=${var.image_version}
      export APP_PORT=${var.app_port}
      export APP_BASE_URL=${var.app_base_url}
      export API_BASE_URL=${var.api_base_url}
      export TZ=${var.timezone}
      docker compose -p ${var.image_name} -f ${path.module}/compose.yaml up -d
    EOT
  }
  depends_on = [docker_image.my_image]
}
