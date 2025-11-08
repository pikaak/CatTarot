// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Parse JSON and keep raw body if needed (webhooks 등)
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// API 요청 로깅 (응답 JSON 일부 캡처)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json.bind(res);
  (res as any).json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson(bodyJson, ...args);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        try {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        } catch { /* ignore stringify errors */ }
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  // 라우트 등록 (API 및 기타 서버 기능)
  const server = await registerRoutes(app);

  // 에러 핸들러
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
    res.status(status).json({ message });
    // 서버 크래시 대신 로그만 남기려면 다음 줄을 주석 처리
    throw err;
  });

  // 개발환경은 Vite 미들웨어, 프로덕션은 정적서빙
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // dist/public 에서 정적 파일 제공 + SPA fallback
    serveStatic(app);
  }

  // Render 등 PaaS는 반드시 PORT 환경변수를 사용해야 함
  // 지정이 없으면 5000 사용
  const port = Number.parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
