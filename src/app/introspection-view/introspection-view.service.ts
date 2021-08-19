import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  GqlAllIntrospectionResponse,
  GqlFindOneTypeByNameResponse,
  SchemaMetadata,
} from './schema.model';

@Injectable({
  providedIn: 'root',
})
export class IntrospectionViewService {
  private schemaUrl = 'http://localhost:5000/graphql'; // URL to web api
  private queryAllSchemaTypes = {
    operationName: 'IntrospectionQuery',
    query:
      'query IntrospectionQuery {\n  __schema {\n    types {\n      name\n      kind\n    }\n  }\n}\n',
    variables: null,
  };

  private queryTypeWithName = {
    operationName: 'IntrospectionTypeQuery',
    query:
      'query IntrospectionTypeQuery($name: String!) {\n  __type(name: $name) {\n    fields {\n      name\n      type {\n        name\n        kind\n        ofType {\n          name\n          kind\n        }\n      }\n    }\n  }\n}\n',
    variables: {
      name: 'Query',
    },
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  /** GET schemas from the server */
  getAllSchemaTypes(): Observable<GqlFindOneTypeByNameResponse> {
    return this.getSchemaTypeWithName('Query');
  }

  getSchemaTypeWithName(
    name: string
  ): Observable<GqlFindOneTypeByNameResponse> {
    this.queryTypeWithName.variables.name = name;
    return this.http
      .post<GqlFindOneTypeByNameResponse>(
        this.schemaUrl,
        this.queryTypeWithName
      )
      .pipe(
        tap((_) => console.log(`fetched schemas for name ${name}`)),
        catchError(
          this.handleError<GqlFindOneTypeByNameResponse>(
            'getSchemaTypeWithName'
          )
        )
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
