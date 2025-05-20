import express from "express";
import next from "next";
import dotenv from "dotenv";
import compression from "compression";

dotenv.config();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev, port, hostname: "0.0.0.0" });
const handle = nextApp.getRequestHandler();

async function main() {
  try {
    await nextApp.prepare();

    const app = express();
    app.use(compression());

    // Next.js 요청 핸들러
    app.all(/(.*)/, (req, res) => {
      console.log(req.url, "req.url", res.getHeaders(), "res.headers");
      return handle(req, res);
    });

    // 서버 시작
    app.listen(port, () => {
      console.log(
        `> Ready on ${nextApp.options.hostname}:${nextApp.options.port}`
      );
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

main();
