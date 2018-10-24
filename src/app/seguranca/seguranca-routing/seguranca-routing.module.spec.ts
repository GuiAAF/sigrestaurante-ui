import { SegurancaRoutingModule } from './seguranca-routing.module';

describe('SegurancaRoutingModule', () => {
  let segurancaRoutingModule: SegurancaRoutingModule;

  beforeEach(() => {
    segurancaRoutingModule = new SegurancaRoutingModule();
  });

  it('should create an instance', () => {
    expect(segurancaRoutingModule).toBeTruthy();
  });
});
