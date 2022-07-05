import {OptionList1, OptionListName} from "../../task-shared/common-model";
class Status extends OptionList1{
  text: 'unassigned' | 'pending' | 'accepted' | 'started' |  'completed'
  constructor() {
    super();
  }
}
export class Task {
  id?: string;
  description: string;
  title: string;
  published: boolean;
  key?: string;
  assignTo: OptionListName;
  status: Status
}
