import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IntrospectionViewService } from './introspection-view.service';
import {
  GqlFindOneTypeByNameResponseField,
  SchemaMetadata,
} from './schema.model';
@Component({
  selector: 'app-introspection-view',
  templateUrl: './introspection-view.component.html',
  styleUrls: ['./introspection-view.component.css'],
})
export class IntrospectionViewComponent implements OnInit {
  selectedSchemaName$: Observable<string> = new Observable();
  fields: GqlFindOneTypeByNameResponseField[] = [
    { name: 'query', type: { name: 'none', kind: 'object' } },
  ];

  constructor(
    private route: ActivatedRoute,
    private introspectionViewService: IntrospectionViewService
  ) {
    this.route.queryParams.subscribe((params) => {
      let selectedName = 'Query';
      if (
        params !== null &&
        params !== undefined &&
        params.name !== null &&
        params.name !== undefined
      ) {
        selectedName = params.name;
      }

      console.log('Route', selectedName);
      if (selectedName === null || selectedName === undefined) {
        return;
      }
      this.introspectionViewService
        .getSchemaTypeWithName(selectedName)
        .toPromise()
        .then((result) => {
          this.fields = result.data.__type.fields;
          this.fields = this.fields.map((field) => {
            if (
              field.type.kind === 'NON_NULL' &&
              field.type.ofType !== undefined
            ) {
              field.type = field.type.ofType;
            }
            return field;
          });
        });
    });
  }

  ngOnInit(): void {
    // this.selectedSchemaName$ = this.route.paramMap.pipe(
    //   map((paramMap: { get: (arg0: string) => any }) => {
    //     console.log(paramMap);
    //     return paramMap.get('name');
    //   })
    // );
    // this.selectedSchemaName$.subscribe((selectedName) => {
    //   console.log('Route', selectedName);
    //   if (selectedName === null || selectedName === undefined) {
    //     return;
    //   }
    //   this.introspectionViewService
    //     .getSchemaTypeWithName(selectedName)
    //     .toPromise()
    //     .then((result) => {
    //       this.schemas = result.data.__type.fields.map((field) => field.type);
    //     });
    // });
    this.introspectionViewService
      .getAllSchemaTypes()
      .toPromise()
      .then((result) => {
        this.fields = result.data.__type.fields;
      });
  }
}
