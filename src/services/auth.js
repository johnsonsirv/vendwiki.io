const {
  InvalidToken,
  AuthTokenGenerationFailed,
  UserNotFound,
  UserSignupFailed,
  UserLoginFailed,
  ExpiredToken,
} = require('../errors/types');
const AuthLogic = require('../logic/auth');

module.exports = class AuthService {
  constructor({ logger, UserService }) {
    this.logger = logger;
    this.UserService = UserService;
  }

  async signup({ username, password, role }) {
    const { UserService } = this;

    const { user } = await UserService.addUser({ password, username, role });

    if (!user) {
      throw new UserSignupFailed();
    }

    const token = user.generateAuthToken();

    return { token };
  }

  async login({ username, password }) {
    const { UserService } = this;

    const { user } = await UserService.getUserByUsername({ username, fields: '+password' });

    // Todo: Multiple device login

    if (!user) {
      throw new UserLoginFailed();
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new UserLoginFailed();
    }

    const token = user.generateAuthToken();

    return { token };
  }

  async validateToken({ token }) {
    const { logger, UserService } = this;

    try {
      const decoded = AuthLogic.verifyToken({ token });

      const { user } = await UserService.getUser({ userId: decoded.userId });

      if (!user) {
        throw new UserNotFound();
      }

      return { user };
    }
    catch (error) {
      logger.debug('[AuthService] - validateToken', {
        error,
        token,
      });

      if (error.name === 'TokenExpiredError') {
        throw new ExpiredToken();
      }

      throw new InvalidToken();
    }
  }

  async generateToken({ user }) {
    const { logger } = this;

    try {
      const token = AuthLogic.getAuthToken({ user });

      return token;
    }
    catch (error) {
      logger.debug('[AuthService] - generateToken', {
        error,
      });

      throw new AuthTokenGenerationFailed();
    }
  }
};
