module.exports = class AuthController {
  constructor({ AuthService }) {
    this.AuthService = AuthService;
  }

  async signup(request) {
    const { AuthService } = this;

    const { username, password, role } = request.payload;

    const { token } = await AuthService.signup({ username, password, role });

    return { token };
  }

  async login(request) {
    const { AuthService } = this;

    const { username, password } = request.payload;

    const { token } = await AuthService.login({ username, password });

    return { token };
  }
};
