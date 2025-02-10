import express from "express";
import "express-async-errors";
import morgan from "morgan";

// ROUTES
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { NotFoundError } from "./errors/not-found-error";

// MIDDLEWARES
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
