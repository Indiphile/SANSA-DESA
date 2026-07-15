# =============================================================
# DESA TerriaMap — customized overlay on upstream TerriaMap
# =============================================================
# Adjust the base tag when upgrading. Confirm the WORKDIR of the
# upstream image before changing the COPY destinations:
#   docker inspect ghcr.io/terriajs/terriamap:<tag> \
#     --format '{{.Config.WorkingDir}}'
# =============================================================

ARG TERRIAMAP_VERSION=latest
FROM ghcr.io/terriajs/terriamap:${TERRIAMAP_VERSION}

# The upstream image runs as an unprivileged user (usually `node`).
# Switch to root only for the COPY, then switch back.
USER root

# --- SANSA / DESA customizations ---
# Catalog & config
COPY --chown=node:node wwwroot/config.json      /app/wwwroot/config.json
COPY --chown=node:node wwwroot/init/simple.json  /app/wwwroot/init/simple.json

# Branding (logos, favicons, custom images)
COPY --chown=node:node wwwroot/images/          /app/wwwroot/images/

# Optional overlays — uncomment only if you actually override them.
# COPY --chown=node:node overlays/wwwroot/index.html     /app/wwwroot/index.html
# COPY --chown=node:node overlays/serverconfig.json      /app/serverconfig.json

# Return to the non-root user the upstream image expects
USER node

# Healthcheck (upstream may already have one; this is safe to re-declare)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- http://localhost:3001/ping || exit 1

# Everything else — WORKDIR, EXPOSE, CMD — is inherited from the base image.