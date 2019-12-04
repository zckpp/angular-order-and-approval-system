import {TestBed, inject} from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {ApiService} from './api.service';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

describe('ApiService', () => {
  describe('readRequests()', () => {
    beforeEach(() => {
      TestBed.resetTestEnvironment();
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
      TestBed.configureTestingModule({
        imports: [HttpClientModule ],
        providers: [ApiService]
      });
    });

    it('should return requests', inject([ApiService], (service: ApiService) => {
      service.readRequests().subscribe(requests => {
        expect(requests.length).toBeGreaterThan(0);
      })
    }));
  });
});
