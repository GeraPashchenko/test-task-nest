import { Test, TestingModule } from '@nestjs/testing';
import { WebcamGateway } from './webcam.gateway';

describe('WebcamGateway', () => {
  let gateway: WebcamGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebcamGateway],
    }).compile();

    gateway = module.get<WebcamGateway>(WebcamGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
