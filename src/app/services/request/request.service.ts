import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    options?: {
      body?: any;
      params?: Record<string, any>;
    },
  ) {
    const url = `${this.baseUrl}/${path}`;

    let httpParams = new HttpParams();

    if (options?.params) {
      Object.keys(options.params).forEach((key) => {
        const value = options.params![key];
        if (value !== null && value !== undefined && value !== '') {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    return this.http.request<T>(method, url, {
      body: options?.body,
      params: httpParams,
    });
  }
}
