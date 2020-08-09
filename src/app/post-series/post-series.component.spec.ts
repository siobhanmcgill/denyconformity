import {beforeEach, ComponentTestingModule, describe} from '../test/test.module.spec';
import {PostSeriesComponent} from './post-series.component';


describe('PostSeriesComponent', () => {
  const module = new ComponentTestingModule(PostSeriesComponent);

  beforeEach(() => {
    module.setup();
  });

  it('should create', () => {
    expect(module.componentInstance).toBeTruthy();
  });
});
