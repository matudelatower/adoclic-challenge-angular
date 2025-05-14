import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { FakeApiService } from '../_services/fake-api.service';
import { inject } from '@angular/core';
import { mergeMap, of, throwError } from 'rxjs';

export const fakeApiInterceptor: HttpInterceptorFn = (req, next) => {

  let fakeApi = inject(FakeApiService);

  const { url, method, body } = req;

  if (!url.startsWith('fake-api')) {
    return next(req);
  }

  const endpoint = url.replace('fake-api', '');

  switch (method) {
    case 'GET':
      return fakeApi.get(endpoint).pipe(
        mergeMap((response) =>
          of(new HttpResponse({ status: 200, body: response }))
        )
      );
    default:
      return throwError(() => new Error('Metodo HTTP no soportado'));
  }

};
