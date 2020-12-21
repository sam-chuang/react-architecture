FROM node:14.15.3-stretch-slim AS build

WORKDIR /src

# Copy package.json and package-lock.json
COPY ./package* ./

# Install packages
RUN npm install

# Copy source code
COPY . .

# TODO: RUN npm run test
RUN npm run build

# Copy build to caddy server
FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/build /site

EXPOSE 80
EXPOSE 443

HEALTHCHECK --interval=5s --timeout=5s --retries=6 --start-period=10s\
    CMD curl -fs http://localhost/healthcheck || exit 1

# Start caddy server
CMD caddy run --config /etc/caddy/Caddyfile