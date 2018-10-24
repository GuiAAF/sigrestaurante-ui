import { EditaisModule } from './editais.module';

describe('EditaisModule', () => {
  let editaisModule: EditaisModule;

  beforeEach(() => {
    editaisModule = new EditaisModule();
  });

  it('should create an instance', () => {
    expect(editaisModule).toBeTruthy();
  });
});
