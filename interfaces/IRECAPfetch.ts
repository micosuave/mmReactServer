export interface IRECAPfetch {
  'id': number;
  'court': string;
  'docket': string;
  'recap_document': number;
  'date_created': string;
  'date_modified': string;
  'date_completed': string;
  'status': number;
  'request_type': number;
  'message': string;
  'pacer_case_id': string;
  'docket_number': string;
  'de_date_start': string;
  'de_date_end': string;
  'de_number_start': string;
  'de_number_end': string;
  'show_parties_and_counsel': boolean;
  'show_terminated_parties': boolean;
  'show_list_of_member_cases': boolean;
}
