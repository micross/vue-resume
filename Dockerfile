FROM registry.cn-shanghai.aliyuncs.com/vegar/bun:alpine AS base

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM registry.cn-shanghai.aliyuncs.com/vegar/bun:alpine

WORKDIR /app

COPY --from=base /app/.output .


CMD ["bun", "./server/index.mjs"]
