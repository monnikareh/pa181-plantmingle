podman login cerit.io
podman build -t cerit.io/xrehako1/plantmingle-be-image -f backend/Dockerfile .
podman build -t cerit.io/xrehako1/plantmingle-fe-image -f app/Dockerfile .
podman push cerit.io/xrehako1/plantmingle-be-image:latest
podman push cerit.io/xrehako1/plantmingle-fe-image:latest
