# Single stage on purpose: posts are read from src/contents and bundled with
# mdx-bundler (a devDependency) at request time, so the runtime needs the
# source tree and the full node_modules.
# ponytail: big image (~1GB); switch to output: 'standalone' + copying src/contents if size matters.
FROM node:22-slim
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && chown -R node:node .next
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
