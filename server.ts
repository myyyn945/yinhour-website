import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Book a Demo
  app.post("/api/send-demo", async (req, res) => {
    try {
      const { name, company, phone, email, requirements } = req.body;
      const client = getResend();
      
      const { data, error } = await client.emails.send({
        from: 'Yinhour Info <onboarding@resend.dev>',
        to: ['dswybs945@gmail.com'],
        subject: `预约产品演示 - ${company} - ${name}`,
        html: `
          <h3>预约详情</h3>
          <p><strong>(原计划发送给 yangpeng@yinhour.com 和 wangz@yinhour.com，由于Resend测试域限制，暂发至此测试邮箱)</strong></p>
          <p><strong>姓名:</strong> ${name}</p>
          <p><strong>公司:</strong> ${company}</p>
          <p><strong>手机:</strong> ${phone}</p>
          <p><strong>邮箱:</strong> ${email}</p>
          <p><strong>演示需求:</strong></p>
          <p>${requirements}</p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // API Route: Submit Idea
  app.post("/api/send-idea", async (req, res) => {
    try {
      const { idea } = req.body;
      const client = getResend();
      
      const { data, error } = await client.emails.send({
        from: 'Yinhour Idea <onboarding@resend.dev>',
        to: ['dswybs945@gmail.com'],
        subject: '奇思AI想 - 创意提交',
        html: `
          <h3>新创意提交</h3>
          <p><strong>(原计划发送给 yangpeng@yinhour.com 和 wangz@yinhour.com，由于Resend测试域限制，暂发至此测试邮箱)</strong></p>
          <p>${idea}</p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
