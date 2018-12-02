import { Pipe, PipeTransform } from "@angular/core";
import { SortOrder } from "src/app/enums/sort.direction";
import { UserModel } from "src/app/model/user-model";
import { isDate } from "util";


@Pipe({
  name: "sort",
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(
    value: any[],
    orderBy: any,
    direction: SortOrder = SortOrder.Ascending
  ): any {
    if (!orderBy || orderBy.trim() == "" || value===null || value===undefined) {
      return value;
    }

    if (direction === SortOrder.Ascending) {
      var a = Array.from(value).sort((item1: any, item2: any) => {
        if(item1[orderBy]==null || item2[orderBy]==null)
        {
          return 0;
        }
        return this.CompareObjects(item1[orderBy], item2[orderBy]);
      });
      return a;
    } else {
      //not asc
      var c= Array.from(value).sort((item1: any, item2: any) => {
        return this.CompareObjects(item2[orderBy], item1[orderBy]);
      });
      return c;
    }
  }

  CompareObjects(a: any, b: any): number {

    if(isDate(a) || isDate(b))
    {
      if (a < b) return -1;
      if (a > b) return 1;
    }
    else if( typeof a  === 'boolean' || typeof b  === 'boolean' )
    {
      if (a < b) return -1;
      if (a > b) return 1;
    }
    else if (isNaN(parseFloat(a)) || !isFinite(a) || (isNaN(parseFloat(b)) || !isFinite(b)) )
     {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
    } 
    else 
    {
      if (parseFloat(a) < parseFloat(b)) return -1;
      if (parseFloat(a) > parseFloat(b)) return 1;
    }

    return 0;
  }
}
