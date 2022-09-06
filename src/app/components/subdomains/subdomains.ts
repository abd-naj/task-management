import {OptionList1, OptionListName} from "../../task-shared/common-model";
class Status extends OptionList1{
  text: 'unassigned' | 'pending' | 'accepted' | 'started' |  'completed'
  constructor() {
    super();
  }
}
export class Subdomain {
  id?: string;
  subdomain: string;
  text1: string;
  text2: string;
  text3: string;
  image1: string;
  image2: string;
  font_color = '#FFF';
  published?: string;
  constructor() {
  }
}
