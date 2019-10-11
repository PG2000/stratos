import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTestModules } from '../../test-framework/core-test.helper';

@Component({
  template: `<input type="text" appUserPermission>`
})
class TestUserPermissionComponent {
}

class MockTemplateRef { }

describe('UserPermissionDirective', () => {
  let component: TestUserPermissionComponent;
  let fixture: ComponentFixture<TestUserPermissionComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...BaseTestModules
      ],
      providers: [
        { provide: TemplateRef, useClass: MockTemplateRef },
      ],
      declarations: [TestUserPermissionComponent]
    });
    fixture = TestBed.createComponent(TestUserPermissionComponent);
    component = fixture.componentInstance;
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
