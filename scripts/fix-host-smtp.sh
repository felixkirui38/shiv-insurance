#!/usr/bin/env bash
# Run ONCE on the Contabo/cPanel VPS (SSH as root) so Coolify containers can reach Exim.
set -euo pipefail

echo "==> Checking SMTP listeners"
ss -tlnp | grep -E ':465|:587' || echo "WARNING: nothing listening on 465/587"

if [[ -f /etc/csf/csf.conf ]]; then
  echo "==> Enabling CSF Docker awareness (if present)"
  sed -i 's/^DOCKER = "0"/DOCKER = "1"/' /etc/csf/csf.conf || true
  if ! grep -q '^DOCKER = "1"' /etc/csf/csf.conf; then
    echo 'DOCKER = "1"' >> /etc/csf/csf.conf
  fi
  csf -r || true
  echo "CSF reloaded"
else
  echo "CSF not found — ensure ufw/firewalld allows Docker → host 465/587"
fi

echo "==> Done. In Coolify set SMTP_HOST=127.0.0.1 with Network Mode=Host (recommended),"
echo "    or SMTP_HOST=host.docker.internal with extra_hosts host-gateway."
