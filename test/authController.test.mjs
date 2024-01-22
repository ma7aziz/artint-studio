import { expect } from 'chai';
import sinon from 'sinon';
import authController from '../controllers/authController.js';

describe('authController', () => {
  describe('PostRegisterUser', () => {
    it('should extract username, email, and password from the request body', async () => {
      // Create a mock request object with the necessary properties
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        },
      };

      // Create a mock response object with necessary methods
      const res = {
        status: sinon.spy(),
        json: sinon.spy(),
      };

      // Create a spy to track the function calls
      const next = sinon.spy();

      // Call the PostRegisterUser function with the mock request, response, and next
      await authController.PostRegisterUser(req, res, next);

      // Assert that the username, email, and password were extracted correctly
      expect(req.body.username).to.equal('testuser');
      expect(req.body.email).to.equal('test@example.com');
      expect(req.body.password).to.equal('password123');

      // Assert that the next function was called
      expect(next.called).to.be.true;

      // Optionally, assert on response status and data sent
      // Example: assert response status
      expect(res.status.calledWith(200)).to.be.true;

      // Example: assert response JSON data
      expect(res.json.calledWithMatch({ message: 'User successfully created' })).to.be.true;
    });
  });
});