import {HttpParams} from "@angular/common/http";

export function buildQueryParams(obj: any): HttpParams {
  let queryParams = new HttpParams();
  Object.keys(obj).forEach(key => {
    if (obj.hasOwnProperty(key)) {
      queryParams = queryParams.append(key, obj[key]);
    }
  });
  return queryParams;
}
