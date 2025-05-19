import express from "express";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const nextApp = next({ dev, hostname });
const handle = nextApp.getRequestHandler();

async function main() {
  try {
    await nextApp.prepare();
    const app = express();

    // Next.js 요청 핸들러
    app.all(/(.*)/, (req, res) => {
      return handle(req, res);
    });

    // 서버 시작
    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

main();
