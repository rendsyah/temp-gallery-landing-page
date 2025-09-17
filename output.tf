output "docker_image_name" {
  description = "Nama image Docker yang dibangun"
  value       = docker_image.my_image.name  # Nama image yang dibangun
}

output "docker_image_version" {
  description = "Versi image Docker yang dibangun"
  value       = split(":", docker_image.my_image.name)[1]  # Versi/tag image dari nama image
}

output "docker_image_id" {
  description = "ID dari image Docker yang dibangun"
  value       = docker_image.my_image.id  # ID image Docker yang telah dibangun
}

output "docker_compose_command" {
  description = "Perintah untuk menjalankan docker-compose"
  value       = "docker compose -p ${var.image_name} -f ${path.module}/compose.yaml up -d"
}

output "timezone" {
  description = "Timezone yang digunakan di dalam container"
  value       = var.timezone  # Menampilkan timezone yang telah ditentukan
}

output "app_port" {
  description = "Port aplikasi yang digunakan di host"
  value       = var.app_port  # Menampilkan port aplikasi di host
}
