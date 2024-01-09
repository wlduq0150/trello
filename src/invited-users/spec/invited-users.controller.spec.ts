import { Test, TestingModule } from '@nestjs/testing';
import { InvitedUsersController } from '../invited-users.controller';

describe('InvitedUsersController', () => {
  let controller: InvitedUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitedUsersController],
    }).compile();

    controller = module.get<InvitedUsersController>(InvitedUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
