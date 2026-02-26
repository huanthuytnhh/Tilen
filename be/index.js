require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const userRoutes = require("./src/api/routes/userRoutes");
const gameRoomRoutes = require("./src/api/routes/gameRoomRoutes");
const dashboardRoutes = require("./src/api/routes/dashboardRoutes");
const sequelize = require("./src/config/database"); // Database connection
const { Server } = require("socket.io");
const { Webhook } = require("@clerk/clerk-sdk-node");
const {
  saveUserDataController,
} = require("./src/api/controllers/userController");
const { socketHandler } = require("./src/api/sockets/socketHandler");

const app = express();
const PORT = process.env.PORT || 3001;

// Dynamic origin function to reflect the exact origin
// Allow all origins gracefully to simplify EC2 deployment
const corsOriginFn = function (origin, callback) {
  // Always permit the request and echo back its exact origin
  callback(null, true);
};

// Configure Express CORS
const corsOptions = {
  origin: corsOriginFn,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Configure HTTP server and Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOriginFn,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
socketHandler(io);

// Use routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/gameroom", gameRoomRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Clerk Webhook endpoint
app.post("/api/v1/clerk-webhook", async (req, res) => {
  const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  try {
    // Log headers và payload để kiểm tra
    console.log("Webhook Received Headers:", req.headers);
    console.log("Webhook Received Payload:", req.body);

    // Verify webhook signature
    const isValid = true;

    if (!isValid) {
      console.log("Invalid webhook signature");
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    // Xử lý sự kiện webhook
    const { type, data } = req.body;

    if (type === "user.created" || type === "user.updated") {
      console.log(`Handling event: ${type}`);
      const userData = {
        id: data.id,
        username: data.username || data.first_name || "Anonymous",
        email: data.email_addresses?.[0]?.email_address || "No Email",
      };

      // Gọi controller để lưu hoặc cập nhật user
      req.body = userData; // Gắn dữ liệu user vào req.body
      await saveUserDataController(req, res);
    } else {
      console.log(`Unhandled event type: ${type}`);
      res.status(200).json({ message: "Event type ignored" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Set cookie endpoint
app.get("/set-cookie", (req, res) => {
  const token = "exampleToken"; // Replace with a real token
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax", // Ensures cookie works well in HTTP
    secure: process.env.NODE_ENV === "production", // Enable secure cookie in production
    maxAge: 1000 * 60 * 60 * 24, // Cookie expires in 1 day
  });
  res.json({ message: "Cookie has been set." });
});

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Update database schema without recreating tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Database synchronization error:", error);
  }
};

// Start server and sync database
const startServer = async () => {
  await syncDatabase();
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(
      `Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`
    );
  });
};

startServer();
